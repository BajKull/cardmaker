# BnnCardMaker

BnnCardMaker is an online application which allows users to create free cards in built in editor, share them through generated URL or download them to local storage.
Users can create cards from scratch or edit available templates.
See the site live [here](https://bnncardmaker.netlify.app/)

## Functionality

### `Authorization`

Users can sign up and sign in. Upon succesfull registration, verification email is sent.
Once the user decides to log in, he stays logged in after closing application and reopening it. User may log out whenever they want.

### `Profile setup`

Once user is logged in they can browse their profile, change avatar, change background, browse uploaded cards and images or see how many cards they created.
User can change their display name and password or delete their account after re-entering password.

### `Crete card`

User can go to the card creator which allows to construct a digital card on a digital canvas.
First they need to choose which resolution they want the card to be.

**Unregistered user** can:

- draw lines
- enter text to draw
- create rectangles
- create circles
- move objects
- change objects ids
- switch objects layers
- remove objects
- hide objects
- import global images to canvas
- download canvas as a png file
- reset card elements

**Logged user** can:

- all that _unregistered user_ can
- upload images from local storage to **Firebase** storage
- search all of the uploaded images by self and import them to canvas
- generate link which is sent to administrator for a review

### `Browse templates`

Users can browse verified cards, import them into their canvas, edit them or download them to their local storage.
Each card has a views indicator which displays how many times each cards was viewed by different users.

Users may filter the cards by their styles which are:

- all
- birthday
- invitation
- congratulation
- thank you
- posts

Users may sort the cards by:

- date
- views
- likes

### `Redirections`

Whenever user enters wrong card id into the address bar or tries to visit non existing subpage he is redirected to the 404 page.
If user that is not logged in tries to go to the profile page he is redirected to the main page and shown sign in form.

## Technology stack

- React
- Redux
- Firebase
