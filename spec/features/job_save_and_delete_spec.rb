require 'rails_helper'

describe "Saving and deleting jobs" do

  #Capybara.default_max_wait_time = 15

  let(:username) { "dunxtand" }
  let(:password) { "jobs" }

  context "when a user saves a job" do
    it "the button changes", js: true do
      User.create!(username: username, name: "Duncan", email: "me@jobs.com", password: password)
      visit "/"
      click_on "Saved Jobs"
      fill_in "username", with: username
      fill_in "password", with: password
      click_on "Log In"
      expect(page).to have_content "Technup"

      click_on "Saved Jobs"
      expect(page).to have_content "Hiya, Duncan!"

      click_on "Jobs"
      fill_in "skill", with: "sql"
      fill_in "zip", with: "11233"
      click_on "Find a job!"
      expect(page).to have_selector "article.post"

      first(".save").click
      #wait_for_ajax

      # expect( first(".save").click ).to eq("ok")

      # expect( button_after_save = first(".clicked") ).not_to be_nil
      # expect( button_after_save.has_text?("√") ).to eq(true)
      # new_job_id = Job.last.id
      # expect(page).to have_selector 
    end

    it "the job is appended to their saved-jobs section" do
    end
  end

  context "when a user deletes a job" do
    it "the job is removed from their saved-jobs section" do
    end

    it "the save button turns back to an enabled blue +" do
    end
  end

end
