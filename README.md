# Textbook Exchange or Book Sharing

Contributors: Kevin Tran, Quentin Barnes, Judy Kwon

deployed at: https://cs336textbook-exchange.herokuapp.com

This is a webapp for textbook exchange at Calvin, to facilitate selling and buying of books between students.
It would include fields for textbook name, course, and price.
It would also have information about the seller's name and contact information.
  - everyone would have to create an account to use this, either to sell or buy
  - additional feature would be to connect the user's profile to Facebook and automatically import the name and contact info.

  # Design
The component structure for your ReactJS frontend and the document structure of your MongoDB backend

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
  It will have 1 database and 1 Collection (for Seller and Book).. for now.

  ---
  FEATURES
  SEARCH BY COURSE OR TITLE
  LOGIN (FACEBOOK FOR NOW)

  SORT BY PRICE OR CONDITION?

sample db structure for now:
  {
      "_id": {
          "$oid": "5c018901fb6fc038cbb02b31"
      },
      "title": "book",
      "author": "name this",
      "price": "$200",
      "course": "Computer Science",
      "condition": "Great"
  }
