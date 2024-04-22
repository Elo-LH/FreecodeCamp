#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=salon --tuples-only -c"
echo -e "\n--- Web School ---\n" 

MAIN_MENU(){
  #get error message
  if [[ $1 ]]
  then
    echo -e "\n$1"
  fi
  #selection of service
  echo "Which course do you want to enroll in ?"
  SERVICES=$($PSQL "SELECT * FROM services")
  echo "$SERVICES" | while read SERVICE_ID BAR SERVICE_NAME
  do
    echo "$SERVICE_ID) $SERVICE_NAME"
  done
  read SERVICE_ID_SELECTED
  SERVICE_ID_SELECTED=$($PSQL "SELECT service_id FROM services WHERE service_id=$SERVICE_ID_SELECTED")
  if [[ -z $SERVICE_ID_SELECTED ]]
  then 
    MAIN_MENU "Please enter an existant course."
  else
    ENROLL_MENU $SERVICE_ID_SELECTED
  fi
}

ENROLL_MENU() {
  SERVICE_ID_SELECTED=$1
  SERVICE_NAME_SELECTED=$($PSQL "SELECT name FROM services WHERE service_id=$SERVICE_ID_SELECTED")
  echo "You have chosen $SERVICE_ID_SELECTED) $SERVICE_NAME_SELECTED"
  #get phone number
  echo -e "\nWhat is your phone number?"
  read CUSTOMER_PHONE
  #get customer
  CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone='$CUSTOMER_PHONE'")
  #if not customer 
  if [[ -z $CUSTOMER_NAME ]]
  then
    #get a name
    echo -e "\nWhat is your name?"
    read CUSTOMER_NAME
    #add customer
    INSERT_NEW_CUSTOMER=$($PSQL "INSERT INTO customers(phone, name) VALUES('$CUSTOMER_PHONE', '$CUSTOMER_NAME')")
  fi
  #get a time
  echo -e "\nWhat time would you like to take the course?"
  read SERVICE_TIME
  #get customer_id
  CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone='$CUSTOMER_PHONE'")
  #add to appointments
  INSERT_NEW_APPOINTMENT=$($PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES($CUSTOMER_ID, $SERVICE_ID_SELECTED, '$SERVICE_TIME')")
  if [[ $INSERT_NEW_APPOINTMENT == 'INSERT 0 1' ]]
  then
    echo "I have put you down for a $SERVICE_NAME_SELECTED at $SERVICE_TIME, $CUSTOMER_NAME."
  fi
}
MAIN_MENU