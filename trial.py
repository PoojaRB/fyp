import speechRecognizer as sr
import nearby
import speechSynthesizer as ss
import rasa_testing as rt
import placeDetailsApi as pd

category_list ={"restaurant_search",
"temple_search",
"mosque_search",
"church_search",
"worship_search",
"atm",
"zoo",
"beach",
"theatre",
"mall",
"museum",
"park",
"historic_site",
"amusement_park",
"resort"}

placeId = None
flag = 0

def getCategory():
    temp = "What type of place do you want to visit?"
    ss.synthesize(temp)
    nou=''
    #category search
    toSpeak=sr.recognize()
    nou=rt.findIntent(toSpeak)
    print("INTENT OUTPUT:"+nou)
    if nou in category_list :
        return nou
    else :
        ss.synthesize("Sorry didnt get that")
        getCategory()
            #return None

        
while placeId == None:
    category = getCategory()
    print(category)
    placeId = nearby.findNearbyPlace(category) #gets the places based on the category
    print(placeId) #place id of the place selected for further details 
    if placeId != None :
        pd.getFilteredDetails(placeId)


    

        
    
