require 'rails_helper'

describe JobsController, type: :controller do

  after(:all) { Job.destroy_all; User.destroy_all }

  let(:request_params) do
    { job:
      {
        position: "Junior Rails Developer",
        company: "The Flatiron School",
        location: "New York, NY",
        date_posted: "2016-06-06",
        url: "http://jobs.com/thejobpost",
        original_search_term: "Rails"
      }
    }
  end

  let(:user) { User.new(name: "Bob", username: "coderbob", email: "bob@getajob.com", password: "password") }

  before(:each) { allow(controller).to receive(:current_user).and_return(user) }


  context "#create" do
    it "saves the job to the database" do
      expect{xhr :post, :create, request_params}.to change {Job.count}.from(0).to(1)
    end

    it "associates the current user with the job" do
      xhr :post, :create, request_params
      expect(Job.last.user).to eq(user)
    end

    it "renders the correct javascript file" do
      xhr :post, :create, request_params
      expect(response).to render_template :create
    end
  end

  context "#destroy" do
    it "removes the job from the database" do
      xhr :post, :create, request_params
      expect{xhr :delete, :destroy, id: Job.first.id}.to change {Job.count}.from(1).to(0)
    end
  end

end
