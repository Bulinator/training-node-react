#!/bin/bash

function localtunnel {
  lt --subdomain a876sxxo0klubuxxx54 --port 5000
}

until localtunnel; do
echo "localtunnel server crashed...reboot"
sleep 2
done
