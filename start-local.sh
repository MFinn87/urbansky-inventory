#!/bin/bash

# Build and start Docker
docker-compose -f ./docker-compose.yml build && docker-compose -f ./docker-compose.yml up
