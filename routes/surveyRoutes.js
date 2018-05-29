const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    // create new parser and extract data
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({ email, url }) => {
        // extract route name, destructuring with _chain
        const match = p.test(new URL(url).pathname); // create object of routing match
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      // remove all array element equal to undefinded
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        }, {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }).exec();
      })
      .value();

  /*
    const events = _.map(req.body, ({ email, url }) => {
      console.log(url);
      const p = new Path('/api/surveys/:surveyId/:choice');
      // extract route name
      const pathname = new URL(url).pathname;
      const match = p.test(pathname); // create object of routing match
      if (match) {
        return { email, surveyId: match.surveyId, choice: match.choice };
      }
    });

    // remove all array element equal to undefinded
    const compactEvents = _.compact(events);
    const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
    */

    //console.log(events);

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    // survey instance
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Send email here
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1; // decrease total of one credit
      const user = await req.user.save();

      res.send(user);
    } catch (e) {
      res.status(422).send(err); // 422 something wrong with data
    }
  });
};
