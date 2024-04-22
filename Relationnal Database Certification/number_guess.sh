#!/bin/bash
PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align --tuples-only -c"

WELCOME_PLAYER() {
  if [[ $1 ]]
  then
    echo -e "\n$1"
  fi
  #ask for username
  echo -e "\nEnter your username:"
  read USERNAME_INPUT
  #if input is not varchar(22) or null 
  if [[ ${#USERNAME_INPUT} -lt 1 ]] || [[ ${#USERNAME_INPUT} -gt 22 ]]
  then
    # ask again for valid username
    WELCOME_PLAYER "Please enter an username between 1 and 22 characters"
  else
    USERNAME=$($PSQL "SELECT username FROM users WHERE username='$USERNAME_INPUT'")
    #if username is in not in database
    if [[ -z $USERNAME ]]
    then
      #insert user in database
      INSERT_NEW_USER=$($PSQL "INSERT INTO users(username, games_played, best_game) VALUES('$USERNAME_INPUT', 0, 1000)")
      USERNAME=$($PSQL "SELECT username FROM users WHERE username='$USERNAME_INPUT'")
      GAMES_PLAYED=$($PSQL "SELECT games_played FROM users WHERE username='$USERNAME'")
      echo $GAMES_PLAYED
      #welcome message for first time
      echo "Welcome, $USERNAME! It looks like this is your first time here."
    else
      #get user data
      GAMES_PLAYED=$($PSQL "SELECT games_played FROM users WHERE username='$USERNAME'")
      BEST_GAME=$($PSQL "SELECT best_game FROM users WHERE username='$USERNAME'")
      #welcome message
      echo Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses.
    fi
    #implement games played
    GAMES_PLAYED=$($PSQL "UPDATE users SET games_played=games_played + 1 WHERE username='$USERNAME'")
    #launch game
    GAME $USERNAME
  fi
}

GAME() {
  #retrieve user data
  USERNAME=$($PSQL "SELECT username FROM users WHERE username='$1'")
  BEST_GAME=$($PSQL "SELECT best_game FROM users WHERE username='$USERNAME'")
  COUNT=1
  #rule of the game 
  echo Guess the secret number between 1 and 1000:
  #generate random number between 1 and 1000
  NUMBER=$(( RANDOM % 1000 + 1 ))
  #take a guess
  read GUESS
  #if input is not a integer take input again
  while [[ ! $GUESS =~ ^[0-9]+$ ]]
  do
    echo "That is not an integer, guess again:"
    read GUESS
  done
  # while input != number to guess
  while [[ $GUESS -ne $NUMBER ]]
  do
    # count ++
    COUNT=$(($COUNT + 1))
    # if number > input
    if [[ $GUESS -gt $NUMBER ]]
    then
      echo "It's lower than that, guess again:"
      read GUESS
    else
      echo "It's higher than that, guess again:"
      read GUESS
    fi
  done
  # echo winning message
  if [[ $GUESS == $NUMBER ]]
  then
    echo You guessed it in $COUNT tries. The secret number was $NUMBER. Nice job!
    # affect count to best_game if < a best_game
    if [[ $COUNT -lt $BEST_GAME ]]
    then
      BEST_GAME=$($PSQL "UPDATE users SET best_game=$COUNT WHERE username='$USERNAME'")
    fi
  fi
}
WELCOME_PLAYER
