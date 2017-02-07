/*
 * This program checks for valid dates between January 1, 1950
 * and  December 31, 2049
 *
 */

var day_of_week = ["Sunday", "Monday", "Tuesday", 
                   "Wednesday", "Thursday", "Friday", 
                   "Saturday"]; 

var month_of_year = ["January", "February", "March", "April",
                     "May", "June", "July", "August", "September", 
                     "October", "November", "December"];

var short_month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];



function emptyDate()
{
   var date = document.getElementById("date");
   if (date.value == "") 
   {    
      return false;
   }
   return true;
}

/*
 * Using regular expressions to test if the date that has been input
 * is in a valid format to convert to a standardized version
 */

function formatCheck()
{
   var date_input = document.getElementById("date");
   var testDate = date_input.value;
   var date_regex_one = /^(0[1-9]|[1-9]|1[0-2])\/(0[1-9]|[1-9]|1\d|2\d|3[01])\/(0[1-9]|[1-9]\d)$/ ;
   var date_regex_two = /^(0[1-9]|[1-9]|1[0-2])\/(0[1-9]|[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
   var date_regex_three = /^(0[1-9]|1\d|2\d|3[01]) ([a-zA-Z]{3}) (19|20)\d{2}$/ ;
   var date_regex_four = /^([a-zA-Z]*) (0[1-9],|[1-9],|1\d,|2\d,|3[01],) (19|20)\d{2}$/ ;
   if(!(date_regex_one.test(testDate) || date_regex_two.test(testDate) ||
        date_regex_three.test(testDate) || date_regex_four.test(testDate)))
   {
      return false;
   }
   return true;
} 




function checkDay()
{
   var result = document.getElementById("result");
   var parsed_date = splitDate();
   var day = getDay(parsed_date);
   var month = getMonth(parsed_date);
   var year = getYear(parsed_date);
   var input_days = daysPerMonth(month, year);

   if (day > input_days) 
   {
      return false;
   }
   return true;
} 


function checkMonth()
{
   var result = document.getElementById("result"); 
   var parsed_date = splitDate();
   var month = getMonth(parsed_date);
   
   if (!month)
   {
      return false;
   }
   if (month <= 0 || month > 12)
   {
      return false;
   }
   return true
}  


function checkYear()
{
   var result = document.getElementById("result"); 
   var parsed_date = splitDate();
   var year = getYear(parsed_date);

   if(year < 10) 
   {
      year = "0" + year.toString();
   }

   var century = reportCentury(parsed_date);
   var full_year = century + "" + year;
   full_year = parseInt(full_year);

   if (full_year < 1950 || full_year > 2049) 
   {
      return false;
   }
   return true;         
}




function performAllChecks()
{
   if (!emptyDate())
   {
      alert("The date can't be empty!");
      return false;
   }

   if (!formatCheck())
   {
      alert("This date is not in the proper format!");
      return false;
   }

   if (!checkDay())
   {
      alert("You have entered an invalid input for days!");
      return false;
   }
   if (!checkMonth())
   {
      alert("You have entered an invalid input for month!");
      return false;
   }
   if (!checkYear())
   {
      alert("You have entered an invalid input for year!");
      return false;
   }
}



function displayDate() 
{
   if (performAllChecks()) 
   {
      var result = document.getElementById("date");
      var standardized_date = splitDate();
      var day = getDay(standardized_date);
      var month = getMonth(standardized_date);
      var year = getYear(standardized_date);
      var century = reportCentury(standardized_date);

      if(year < 10) 
      {
         year = "0" + year.toString();
      }

      var output = getTheDay(week_day(day, month, parseInt(year), century)) + 
                   ", " + getTheMonth(month - 1) + " " + day + ", " +
                   century + "" + year;

      result.innerHTML = output;
   }
}

function splitDate()
{
   var date = document.getElementById("date");
   var input = input.value;
   
   if (input.includes(",")) 
   {
      var date_array = /^([a-zA-Z]*) (\d{1,2}), (\d{2}|\d{4})$/i;
   } 
   else if (input.includes("/")) 
   {
      var date_array = /^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/;
   }
   else 
   {
      var date_array = /^(\d{1,2}) ([a-zA-Z]{3}) (\d{2}|\d{4})$/i;
   }
   
   var parsed_date = input.match(date_array); 
   return parsed_date;
}

function getDay(parsed_date) 
{
   var date = document.getElementById("date");
   var input = the_date.value;

   if (input.includes("/") || input.includes(","))
   {
      return parseInt(parsed_date[2]); 
   } 
   else 
   {
      return parseInt(parsed_date[1]);
   }
}


function getMonth(parsed_date) 
{
   var month = 0;
   var the_date = document.getElementById("date");
   var date = the_date.value;

   if (date.includes("/"))
   {
      month = parseInt(parsed_date[1]);
      return month;
   } 
   else if (date.includes(","))
   {
      month = parsed_date[1];
   }
   else
   {
      month = parsed_date[2];
   }
   if (month_of_year.indexOf(month) > -1)
   {
      month = month_of_year.indexOf(month);
   } 
   else if (short_month.indexOf(month) > -1) 
   {
      month = short_month.indexOf(month);
   }
   return parseInt(month);
}

function getYear(parsed_date) 
{
   var year = parsed_date[3];
   var the_year = 0;
   if (year.length == 2) 
   {
      the_year = year;
   } 
   if (year.length == 4)
   {
      the_year = year % 100;
   }
   return parseInt(the_year);
}

function reportCentury(parsed_date) 
{
   var century = parsed_date[3];
   var century_is = 0;

   if (century.length == 4)
   {
      last_two_digits = Math.floor(century / 100);
   }
   if (century.length == 2) 
   {
      if (century > 49 && century < 100) 
      {
         century_is = 19;
      } 
      else if (century > 00 && century < 50) 
      {
         century_is = 20;
      }
   }
   return parseInt(century_is);
}


function leapYear (year) 
{
   if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) 
   {
      return true;
   } 
   else 
   {
      return false;
   }
}



function daysPerMonth(month, year) 
{
   var days = 0;
   if (month == 4 || month == 6 || month == 9 || month == 11)
   {
      days = 30; 
   }
   else if(month == 1 || month == 3 || month == 5 ||
           month == 7 || month == 8 || month == 10 ||
           month == 12)
   {
      days = 31;
   } 
   else if (month == 2 && leapYear(year)) 
   {
      days = 29;
   } 
   else if (month == 2 && !leapYear(year)) 
   {
      days = 28;
   }
   return days;
}

function week_day(day, month, year, century) 
{
   if (month < 3) 
   {
      year = year - 1;
      month = month + 10;
   } 
   else 
   {
      month = month - 2;
   }

   var week_day = (Math.floor((26 * month - 2) / 10) + day + year + 
      Math.floor(year / 4) + Math.floor(century / 4) + 5 * century) % 7;

   return week_day;
}


function getTheDay(day) 
{
   return day_of_week[day];
}


function getTheMonth(month) 
{
   return month_of_year[month];
}

