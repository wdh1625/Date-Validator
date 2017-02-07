/*
 * This program checks for valid dates between January 1, 1900
 * and  December 31, 2100
 *
 */

var day_of_week = ["Sunday", "Monday", "Tuesday", 
                   "Wednesday", "Thursday", "Friday", 
                   "Saturday"]; 

var month_of_year = ["","January", "February", "March", "April",
                     "May", "June", "July", "August", "September", 
                     "October", "November", "December"];

var short_month = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun",
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

function formatCheck()
{
   var date_input = document.getElementById("date");
   var testDate = date_input.value;
   var date_regex_one = /^(0[1-9]|[1-9]|1[0-2])\/(0[1-9]|[1-9]|1\d|2\d|3[01])\/(0[1-9]|[1-9]\d)$/ ;
   var date_regex_two = /^(0[1-9]|[1-9]|1[0-2])\/(0[1-9]|[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
   var date_regex_three = /^([1-9]|0[1-9]|1\d|2\d|3[01]) ([a-zA-Z]{3}) (19|20)\d{2}$/ ;
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
   var parsed_date = splitDate();
   var year = splitYear(parsed_date);
   var month = splitMonth(parsed_date);
   var day = splitDay(parsed_date);   
   var total_days = daysPerMonth(month, year);
   
   if(day > total_days)
   {
      return false;
   }
   return true;
}

function checkMonth()
{
   var parsed_date = splitDate();
   var month = splitMonth(parsed_date);
   
   if(!month)
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
      alert("Invlaid input, please review your entry!");
      return false;
   }
  
   if (!checkMonth())
   {
      alert("Not a valid input for month!")
      return false;
   }

   if (!checkDay())
   {
      alert("Not a valid input for day!")
      return false;
   }
   return true;
}

function splitDate()
{
   var date = document.getElementById("date");
   var input = date.value;
   
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

function splitDay(parsed_date) 
{
   var the_date = document.getElementById("date");
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

function splitMonth(parsed_date) 
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

function splitYear(parsed_date) 
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


function leapYear(the_year) 
{
   if ((the_year % 4 == 0 && the_year % 100 != 0) || (the_year % 400 == 0)) 
   {
      return true;
   } 
   else 
   {
      return false;
   }
}

function daysPerMonth(month, the_year) 
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
   else if (month == 2 && leapYear(the_year)) 
   {
      days = 29;
   } 
   else if (month == 2 && !leapYear(the_year)) 
   {
      days = 28;
   }
   return days;
}


function reportCentury(parsed_date) 
{
   var century = parsed_date[3];
   var century_is = 0;

   if (century.length == 4)
   {
      century_is = Math.floor(century / 100);
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

function get_the_day(day, month, the_year, century_is) 
{
   if (month < 3) 
   {
      the_year = the_year - 1;
      month = month + 10;
   } 
   else 
   {
      month = month - 2;
   }

   var get_the_day = (Math.floor((26 * month - 2) / 10) + day + the_year + 
      Math.floor(the_year / 4) + Math.floor(century_is / 4) + 5 * century_is) % 7;

   return get_the_day;
}

//Display function to make sure everything is working
function displayDate()
{
   if(performAllChecks())
   {
      var date_output = document.getElementById("result");
      var parsed_date = splitDate(); 
      var century = reportCentury(parsed_date);  
      var year = splitYear(parsed_date);
      var month = splitMonth(parsed_date);
      var day = splitDay(parsed_date);
      var day_number = get_the_day(day, month, year, century);

      if(year < 10)
      {
         year = "0" + year;
      }

      var full_date = day_of_week[day_number] + ", " + month_of_year[month] + 
" " + day + ", " + century + year; 
      date_output.innerHTML = full_date;
   }  
}
