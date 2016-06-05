# module Adapter
#   class GooglePlacesAPI
#     def autocompleteLookup(term:) # gets data that corresponds to things that are like the term (mostly to abstract away data-getting for the placeIDLookup)
#       autocompleteURL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=#{term}&key=#{ENV['GOOGLE_PLACES_KEY']}"
#       data = RestClient::Request.execute(url: autocompleteURL, method: "get", ssl_ca_file: "/Users/asiega/cert.pem", verify_ssl: false)
#       JSON.parse(data)["predictions"]
#       binding.pry
#     end
#
#     def placeIDLookup(term:) # get placeID from term (auto)
#       data = autocompleteLookup(term: term)
#       data.each_with_index do |result, i|
#         if result["description"] == term
#           data[i]["place_id"]
#         end
#       end
#     end
#
#     def detailsLookup(placeID:) # get details about the specific place from placeID
#       detailsURL = "https://maps.googleapis.com/maps/api/place/details/json?placeid=#{placeID}&key=#{ENV['GOOGLE_PLACES_KEY']}"
#       data = RestClient::Request.execute(url: detailsURL, method: "get", ssl_ca_file: "/Users/asiega/cert.pem", verify_ssl: false)
#       JSON.parse(data)
#     end
#   end
# end
