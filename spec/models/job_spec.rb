require 'rails_helper'

describe Job do

  let(:user) { User.new(name: "Bob", username: "coderbob", password: "password") }

  let(:valid_attributes) do
    {
      position: "Junior Rails Developer",
      company: "The Flatiron School",
      location: "New York, NY",
      date_posted: "2016-06-06",
      url: "http://jobs.com/thejobpost",
      original_search_term: "Rails",
      user: user
    }
  end

  context "valid job object" do

    it "is valid with valid attributes" do
      job = Job.new(valid_attributes)
      expect(job).to be_valid
    end

    it "is invalid without a position" do
      job = Job.new(valid_attributes.except(:position))
      expect(job).not_to be_valid
    end

    it "is invalid without a company" do
      job = Job.new(valid_attributes.except(:company))
      expect(job).not_to be_valid
    end

    it "is invalid without a location" do
      job = Job.new(valid_attributes.except(:location))
      expect(job).not_to be_valid
    end

    it "is invalid without the date posted" do
      job = Job.new(valid_attributes.except(:date_posted))
      expect(job).not_to be_valid
    end

    it "is invalid without the job post url" do
      job = Job.new(valid_attributes.except(:url))
      expect(job).not_to be_valid
    end

    it "is invalid without the original search term" do
      job = Job.new(valid_attributes.except(:original_search_term))
      expect(job).not_to be_valid
    end

    it "must be associated with a user" do
      job = Job.new(valid_attributes.except(:user))
      expect(job).not_to be_valid
    end

  end
end
