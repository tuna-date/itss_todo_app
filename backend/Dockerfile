FROM ruby:2.6.5
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs && npm install yarn -g

RUN mkdir -p /app/backend
WORKDIR /app/backend
ADD . /app/backend

ENV BUNDLER_VERSION 2.1.4
RUN gem install bundler -v 2.1.4
RUN bundle install 
RUN yarn install