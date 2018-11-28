# cs336

This is an updated vision statement and a preliminary design for your team project. The vision should be an updated version of your original proposal and should include a list the names of all team members; store this in the README.md for one of the team members, deleting the project directories for all other team members so that it’s obvious where the main projects are. 

The design should specify the component structure for your ReactJS frontend and the document structure of your MongoDB backend; store this in DESIGN.md.

---
Component Structure - ReactJS
1. MAIN PAGE:
	TEXTBOOK SEARCH FORM
		SELL BUTTON (TOP RIGHT CORNER)
		SEARCH BAR
		SEARCH BUTTON
		RADIO BUTTON FOR COURSE
		RADIO BUTTON FOR TITLE
		
	TEXTBOOK LIST
		HEADER
		TEXTBOOK OBJECT(S)

2. BOOK PAGE:
	PHOTO
	TITLE
	AUTHOR
	PRICE
	COURSE
	CONDITION
	
	SELLER (NAME, EMAIL, PHONE, FB)
	
3. SELLER UPLOAD PAGE:
	PHOTO
	TITLE
	AUTHOR
	PRICE (FIXED PRICE OR OBO (RADIO BUTTON))
	COURSE 
	CONDITION (WORN, USED, LIKE NEW, NEW (DROP DOWN MENU))
---
DOCUMENT STRUCTURE

TEXTBOOK
(CORE ATTRIBUTES)
	PHOTO
	TITLE
	AUTHOR
	PRICE
	COURSE
	CONDITION (WORN, USED, LIKE NEW, NEW)

(OPTIONAL ATTRIBUTES)
	ISBN
	
(OPTIONAL FEATURES)
	OBO (OR BEST OFFER)

SELLER
(CORE ATTRIBUTES)
	NAME
	EMAIL
	PHONE
	
---	
DATABASE STRUCTURE
It will have 1 database and 2 Collections (for Seller and Book).. for now. We might need extra collections to record transactions or state of book.

---
FEATURES
SEARCH BY COURSE OR TITLE
LOGIN (FACEBOOK FOR NOW)

SORT BY PRICE OR CONDITION?

	
	
	

