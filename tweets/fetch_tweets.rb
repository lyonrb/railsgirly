require 'rubygems'
require 'bundler'

Bundler.require

class Tweets
  def self.store_tweets!
    tweets = new
    tweets.load
    tweets.search!
    tweets.save
  end

  class NoNewTweets < Exception
  end

  def initialize
    @tweets = []
  end

  def load
    if File.exists?(filename)
      @tweets = YAML.load_file(filename)
      puts "#{@tweets.size} tweets loaded"
    end
  end

  def search!
    page = 1
    search = Twitter.search("#rulu OR @rulu", :page => page)
    tweets = search.results
    while tweets
      store(tweets)
      page += 1
      search = Twitter.search("#rulu OR @rulu", :page => page)
      p tweets = search.results
    end
  end

  def save
    File.open(filename, 'w') do |f|
      f.write @tweets.to_yaml
    end
    puts "#{@tweets.size} tweets saved"
  end

  def store(tweets)
    new_tweets = tweets - @tweets
    if new_tweets.empty?
      puts "NoNewTweets"
      sleep 1
    end

    @tweets += tweets
    @tweets.uniq!
    save
  end

  def filename
    'tweets.yaml'
  end
end

Tweets.store_tweets!
