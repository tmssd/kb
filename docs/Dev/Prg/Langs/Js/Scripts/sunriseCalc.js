/*
 * Tasker javascript to calculate the sunrise and sunset at a given latitude and
 *  longitude. Adapted from Earth System Research Laboratory page: http://www.esrl.noaa.gov/gmd/grad/solcalc/
 *  Adapted by Simon Greenaway (Simon.Greenaway@btinternet.com).
 *
 *  The current timezone and daylight savings are used. Position is passed via
 *  the %lat and %lng tasker variables, and returned as %rise and %sunset.
 *
 */

function calcTimeJulianCent(jd)
{
        var T = (jd - 2451545.0) / 36525.0;
        return T;
}

function calcJDFromJulianCent(t)
{
        var JD = t * 36525.0 + 2451545.0;
        return JD;
}

function isLeapYear(yr)
{
        return ((yr % 4 == 0 && yr % 100 != 0) || yr % 400 == 0);
}

function calcDoyFromJD(jd)
{
        var z = Math.floor(jd + 0.5);
        var f = (jd + 0.5) - z;
        if (z < 2299161)
        {
                var A = z;
        }
        else
        {
                alpha = Math.floor((z - 1867216.25) / 36524.25);
                var A = z + 1 + alpha - Math.floor(alpha / 4);
        }

        var B = A + 1524;
        var C = Math.floor((B - 122.1) / 365.25);
        var D = Math.floor(365.25 * C);
        var E = Math.floor((B - D) / 30.6001);
        var day = B - D - Math.floor(30.6001 * E) + f;
        var month = (E < 14) ? E - 1 : E - 13;
        var year = (month > 2) ? C - 4716 : C - 4715;

        var k = (isLeapYear(year) ? 1 : 2);
        var doy = Math.floor((275 * month) / 9) - k * Math.floor((month + 9) / 12) + day - 30;

        return doy;
}


function radToDeg(angleRad)
{
        return (180.0 * angleRad / Math.PI);
}

function degToRad(angleDeg)
{
        return (Math.PI * angleDeg / 180.0);
}

function calcGeomMeanLongSun(t)
{
        var L0 = 280.46646 + t * (36000.76983 + t * (0.0003032));
        while (L0 > 360.0)
        {
                L0 -= 360.0;
        }
        while (L0 < 0.0)
        {
                L0 += 360.0;
        }

        return L0;		// in degrees
}

function calcGeomMeanAnomalySun(t)
{
        var M = 357.52911 + t * (35999.05029 - 0.0001537 * t);
        return M;		// in degrees
}

function calcEccentricityEarthOrbit(t)
{
        var e = 0.016708634 - t * (0.000042037 + 0.0000001267 * t);
        return e;		// unitless
}

function calcSunEqOfCenter(t)
{
        var m = calcGeomMeanAnomalySun(t);
        var mrad = degToRad(m);
        var sinm = Math.sin(mrad);
        var sin2m = Math.sin(mrad + mrad);
        var sin3m = Math.sin(mrad + mrad + mrad);
        var C = sinm * (1.914602 - t * (0.004817 + 0.000014 * t)) + sin2m * (0.019993 - 0.000101 * t) + sin3m * 0.000289;
        return C;		// in degrees
}

function calcSunTrueLong(t)
{
        var l0 = calcGeomMeanLongSun(t);
        var c = calcSunEqOfCenter(t);
        var O = l0 + c;
        return O;		// in degrees
}

function calcSunTrueAnomaly(t)
{
        var m = calcGeomMeanAnomalySun(t);
        var c = calcSunEqOfCenter(t);
        var v = m + c;
        return v;		// in degrees
}

function calcSunRadVector(t)
{
        var v = calcSunTrueAnomaly(t);
        var e = calcEccentricityEarthOrbit(t);
        var R = (1.000001018 * (1 - e * e)) / (1 + e * Math.cos(degToRad(v)));
        return R;		// in AUs
}

function calcSunApparentLong(t)
{
        var o = calcSunTrueLong(t);
        var omega = 125.04 - 1934.136 * t;
        var lambda = o - 0.00569 - 0.00478 * Math.sin(degToRad(omega));
        return lambda;		// in degrees
}

function calcMeanObliquityOfEcliptic(t)
{
        var seconds = 21.448 - t * (46.8150 + t * (0.00059 - t * (0.001813)));
        var e0 = 23.0 + (26.0 + (seconds / 60.0)) / 60.0;
        return e0;		// in degrees
}

function calcObliquityCorrection(t)
{
        var e0 = calcMeanObliquityOfEcliptic(t);
        var omega = 125.04 - 1934.136 * t;
        var e = e0 + 0.00256 * Math.cos(degToRad(omega));
        return e;		// in degrees
}

function calcSunRtAscension(t)
{
        var e = calcObliquityCorrection(t);
        var lambda = calcSunApparentLong(t);
        var tananum = (Math.cos(degToRad(e)) * Math.sin(degToRad(lambda)));
        var tanadenom = (Math.cos(degToRad(lambda)));
        var alpha = radToDeg(Math.atan2(tananum, tanadenom));
        return alpha;		// in degrees
}

function calcSunDeclination(t)
{
        var e = calcObliquityCorrection(t);
        var lambda = calcSunApparentLong(t);

        var sint = Math.sin(degToRad(e)) * Math.sin(degToRad(lambda));
        var theta = radToDeg(Math.asin(sint));
        return theta;		// in degrees
}

function calcEquationOfTime(t)
{
        var epsilon = calcObliquityCorrection(t);
        var l0 = calcGeomMeanLongSun(t);
        var e = calcEccentricityEarthOrbit(t);
        var m = calcGeomMeanAnomalySun(t);

        var y = Math.tan(degToRad(epsilon) / 2.0);
        y *= y;

        var sin2l0 = Math.sin(2.0 * degToRad(l0));
        var sinm = Math.sin(degToRad(m));
        var cos2l0 = Math.cos(2.0 * degToRad(l0));
        var sin4l0 = Math.sin(4.0 * degToRad(l0));
        var sin2m = Math.sin(2.0 * degToRad(m));

        var Etime = y * sin2l0 - 2.0 * e * sinm + 4.0 * e * y * sinm * cos2l0 - 0.5 * y * y * sin4l0 - 1.25 * e * e * sin2m;
        return radToDeg(Etime) * 4.0;	// in minutes of time
}

function calcHourAngleSunrise(lat, solarDec,twilightDelta)
{
        var latRad = degToRad(lat);
        var sdRad = degToRad(solarDec);

 	// 90.833 for sunrise. 
        var HAarg = (Math.cos(degToRad(90.833+twilightDelta)) / (Math.cos(latRad) * Math.cos(sdRad)) - Math.tan(latRad) * Math.tan(sdRad));
        var HA = Math.acos(HAarg);
        return HA;		// in radians (for sunset, use -HA)
}

function isNumber(inputVal)
{
        var oneDecimal = false;
        var inputStr = "" + inputVal;
        for (var i = 0; i < inputStr.length; i++)
        {
                var oneChar = inputStr.charAt(i);
                if (i == 0 && (oneChar == "-" || oneChar == "+"))
                {
                        continue;
                }
                if (oneChar == "." && !oneDecimal)
                {
                        oneDecimal = true;
                        continue;
                }
                if (oneChar < "0" || oneChar > "9")
                {
                        return false;
                }
        }
        return true;
}


function zeroPad(n, digits) {
        n = n.toString();
        while (n.length < digits) {
                n = '0' + n;
        }
        return n;
}

function month(name, numdays, abbr)
{
        this.name = name;
        this.numdays = numdays;
        this.abbr = abbr;
}

var monthList = new Array();
var i = 0;
monthList[i++] = new month("January", 31, "Jan");
monthList[i++] = new month("February", 28, "Feb");
monthList[i++] = new month("March", 31, "Mar");
monthList[i++] = new month("April", 30, "Apr");
monthList[i++] = new month("May", 31, "May");
monthList[i++] = new month("June", 30, "Jun");
monthList[i++] = new month("July", 31, "Jul");
monthList[i++] = new month("August", 31, "Aug");
monthList[i++] = new month("September", 30, "Sep");
monthList[i++] = new month("October", 31, "Oct");
monthList[i++] = new month("November", 30, "Nov");
monthList[i++] = new month("December", 31, "Dec");


function getJD()
{
        var date=new Date();

        var docmonth = date.getMonth()+1;
        var docday = date.getDate();
        var docyear = date.getFullYear();

        if ((isLeapYear(docyear)) && (docmonth == 2))
        {
                if (docday > 29)
                {
                        docday = 29;
                        //document.getElementById("daybox").selectedIndex = docday - 1;
                }
        }
        else
        {
                if (docday > monthList[docmonth - 1].numdays)
                {
                        docday = monthList[docmonth - 1].numdays;
                        //document.getElementById("daybox").selectedIndex = docday - 1;
                }
        }

        if (docmonth <= 2)
        {
                docyear -= 1;
                docmonth += 12;
        }

        //alert(docyear+" "+docmonth+" "+docday);

        var A = Math.floor(docyear / 100);
        var B = 2 - A + Math.floor(A / 4);
        var JD = Math.floor(365.25 * (docyear + 4716)) + Math.floor(30.6001 * (docmonth + 1)) + docday + B - 1524.5;

        return JD;
}

function getTimeLocal()
{
        var now=new Date();

        var dochr = now.getHours();
        var docmn = now.getMinutes();
        var docsc = now.getSeconds();
        var docdst = 0;

        var mins = dochr * 60 + docmn + docsc / 60.0;

        return mins;
}

function calcAzEl(output, T, localtime, latitude, longitude, zone)
{
        var eqTime = calcEquationOfTime(T);
        var theta = calcSunDeclination(T);

        //if (output)
        {
                var eqtbox = Math.floor(eqTime * 100 + 0.5) / 100.0;
                var sdbox = Math.floor(theta * 100 + 0.5) / 100.0;

                //document.getElementById("eqtbox").value = Math.floor(eqTime * 100 + 0.5) / 100.0;
                //document.getElementById("sdbox").value = Math.floor(theta * 100 + 0.5) / 100.0;
        }

        var solarTimeFix = eqTime + 4.0 * longitude - 60.0 * zone;
        var earthRadVec = calcSunRadVector(T);
        var trueSolarTime = localtime + solarTimeFix;
        while (trueSolarTime > 1440)
        {
                trueSolarTime -= 1440;
        }

        var hourAngle = trueSolarTime / 4.0 - 180.0;

        if (hourAngle < -180)
        {
                hourAngle += 360.0;
        }

        var haRad = degToRad(hourAngle)
        var csz = Math.sin(degToRad(latitude)) * Math.sin(degToRad(theta)) + Math.cos(degToRad(latitude)) * Math.cos(degToRad(theta)) * Math.cos(haRad)

        if (csz > 1.0)
        {
                csz = 1.0;
        }
        else if (csz < -1.0)
        {
                csz = -1.0;
        }

        var zenith = radToDeg(Math.acos(csz));
        var azDenom = (Math.cos(degToRad(latitude)) * Math.sin(degToRad(zenith)));

        if (Math.abs(azDenom) > 0.001)
        {
                azRad = ((Math.sin(degToRad(latitude)) * Math.cos(degToRad(zenith))) - Math.sin(degToRad(theta))) / azDenom;

                if (Math.abs(azRad) > 1.0)
                {
                        if (azRad < 0)
                        {
                                azRad = -1.0;
                        }
                        else
                        {
                                azRad = 1.0;
                        }
                }

                var azimuth = 180.0 - radToDeg(Math.acos(azRad));

                if (hourAngle > 0.0)
                {
                        azimuth = -azimuth;
                }
        }
        else
        {
                if (latitude > 0.0)
                {
                        azimuth = 180.0;
                }
                else
                {
                        azimuth = 0.0;
                }
        }

        if (azimuth < 0.0)
        {
                azimuth += 360.0;
        }

        var exoatmElevation = 90.0 - zenith;

        // Atmospheric Refraction correction

        if (exoatmElevation > 85.0)
        {
                var refractionCorrection = 0.0;
        }
        else
        {
                var te = Math.tan(degToRad(exoatmElevation));

                if (exoatmElevation > 5.0)
                {
                        var refractionCorrection = 58.1 / te - 0.07 / (te * te * te) + 0.000086 / (te * te * te * te * te);
                }
                else if (exoatmElevation > -0.575)
                {
                        var refractionCorrection = 1735.0 + exoatmElevation * (-518.2 + exoatmElevation * (103.4 + exoatmElevation * (-12.79 + exoatmElevation * 0.711)));
                }
                else
                {
                        var refractionCorrection = -20.774 / te;
                }

                refractionCorrection = refractionCorrection / 3600.0;
        }

        var solarZen = zenith - refractionCorrection;

        if (solarZen > 108.0)
        {
                var azbox = "dark";
                var elbox = "dark";
        }
        else
        {
                var azbox = Math.floor(azimuth * 100 + 0.5) / 100.0;
                var elbox = Math.floor((90.0 - solarZen) * 100 + 0.5) / 100.0;

                //alert(azbox+"\t"+elbox);
        }

        return (azimuth);
}

function calcSolNoon(jd, longitude, timezone, dst)
{
        var tnoon = calcTimeJulianCent(jd - longitude / 360.0);
        var eqTime = calcEquationOfTime(tnoon);
        var solNoonOffset = 720.0 - (longitude * 4) - eqTime; // in minutes
        var newt = calcTimeJulianCent(jd + solNoonOffset / 1440.0);
        eqTime = calcEquationOfTime(newt);
        solNoonLocal = 720 - (longitude * 4) - eqTime + (timezone * 60.0);// in minutes
        if (dst)
                solNoonLocal += 60.0;
        while (solNoonLocal < 0.0)
        {
                solNoonLocal += 1440.0;
        }

        while (solNoonLocal >= 1440.0)
        {
                solNoonLocal -= 1440.0;
        }

        var noon=timeString(solNoonLocal, 3);

        //alert("Noon: "+noon);

        //document.getElementById("noonbox").value = timeString(solNoonLocal, 3);
}

function dayString(jd, next, flag)
{
// returns a string in the form DDMMMYYYY[ next] to display prev/next rise/set
// flag=2 for DD MMM, 3 for DD MM YYYY, 4 for DDMMYYYY next/prev
        if ((jd < 900000) || (jd > 2817000))
        {
                var output = "error";
        }
        else
        {
                var z = Math.floor(jd + 0.5);
                var f = (jd + 0.5) - z;
                if (z < 2299161)
                {
                        var A = z;
                }
                else
                {
                        alpha = Math.floor((z - 1867216.25) / 36524.25);
                        var A = z + 1 + alpha - Math.floor(alpha / 4);
                }

                var B = A + 1524;
                var C = Math.floor((B - 122.1) / 365.25);
                var D = Math.floor(365.25 * C);
                var E = Math.floor((B - D) / 30.6001);
                var day = B - D - Math.floor(30.6001 * E) + f;
                var month = (E < 14) ? E - 1 : E - 13;
                var year = ((month > 2) ? C - 4716 : C - 4715);
                if (flag == 2)
                        var output = zeroPad(day, 2) + " " + monthList[month - 1].abbr;
                if (flag == 3)
                        var output = zeroPad(day, 2) + monthList[month - 1].abbr + year.toString();
                if (flag == 4)
                        var output = zeroPad(day, 2) + monthList[month - 1].abbr + year.toString() + ((next) ? " next" : " prev");
        }

        return output;
}

function timeDateString(JD, minutes)
{
        var output = timeString(minutes, 2) + " " + dayString(JD, 0, 2);
        return output;
}

function timeString(minutes, flag)
// timeString returns a zero-padded string (HH:MM:SS) given time in minutes
// flag=2 for HH:MM, 3 for HH:MM:SS
{
        if ((minutes >= 0) && (minutes < 1440))
        {
                var floatHour = minutes / 60.0;
                var hour = Math.floor(floatHour);
                var floatMinute = 60.0 * (floatHour - Math.floor(floatHour));
                var minute = Math.floor(floatMinute);
                var floatSec = 60.0 * (floatMinute - Math.floor(floatMinute));
                var second = Math.floor(floatSec + 0.5);

                if (second > 59)
                {
                        second = 0;
                        minute += 1;
                }

                if ((flag == 2) && (second >= 30))
                        minute++;

                if (minute > 59)
                {
                        minute = 0;
                        hour += 1;
                }

                var output = zeroPad(hour, 2) + ":" + zeroPad(minute, 2);

                if (flag > 2)
                        output = output + ":" + zeroPad(second, 2);

        }
        else
        {
                var output = "error";
        }

        return output;
}

function calcSunriseSetUTC(rise, JD, latitude, longitude,twilightDelta)
{
        var t = calcTimeJulianCent(JD);
        var eqTime = calcEquationOfTime(t);
        var solarDec = calcSunDeclination(t);
        var hourAngle = calcHourAngleSunrise(latitude, solarDec,twilightDelta);
        //alert("HA = " + radToDeg(hourAngle));
        if (!rise)
                hourAngle = -hourAngle;

        var delta = longitude + radToDeg(hourAngle);
        var timeUTC = 720 - (4.0 * delta) - eqTime;	// in minutes
        return timeUTC;
}

function calcSunriseSet(rise, JD, latitude, longitude, timezone, dst, twilightdelta)
// rise = 1 for sunrise, 0 for sunset
{
        var id = ((rise) ? "risebox" : "setbox");
        var timeUTC = calcSunriseSetUTC(rise, JD, latitude, longitude,twilightdelta);
        var newTimeUTC = calcSunriseSetUTC(rise, JD + timeUTC / 1440.0, latitude, longitude,twilightdelta);
        if (isNumber(newTimeUTC))
        {
                var timeLocal = newTimeUTC + (timezone * 60.0);

                timeLocal += ((dst) ? 60.0 : 0.0);

                if ((timeLocal >= 0.0) && (timeLocal < 1440.0))
                {
                        return timeString(timeLocal, 2);
                }
                else
                {
                        var jday = JD;
                        var increment = ((timeLocal < 0) ? 1 : -1);
                        while ((timeLocal < 0.0) || (timeLocal >= 1440.0))
                        {
                                timeLocal += increment * 1440.0;
                                jday -= increment;
                        }

                        return timeDateString(jday, timeLocal);
                }
        }
        else
        { // no sunrise/set found
                var doy = calcDoyFromJD(JD);
                if (((latitude > 66.4) && (doy > 79) && (doy < 267)) ||
                        ((latitude < -66.4) && ((doy < 83) || (doy > 263))))
                {   //previous sunrise/next sunset
                        if (rise)
                        { // find previous sunrise
                                jdy = calcJDofNextPrevRiseSet(0, rise, JD, latitude, longitude, timezone, dst, twilightDelta);
                        }
                        else
                        { // find next sunset
                                jdy = calcJDofNextPrevRiseSet(1, rise, JD, latitude, longitude, timezone, dst, twilightDelta);
                        }

                        return dayString(jdy, 0, 3);
                }
                else
                {   //previous sunset/next sunrise
                        if (rise == 1)
                        { // find previous sunrise
                                jdy = calcJDofNextPrevRiseSet(1, rise, JD, latitude, longitude, timezone, dst, twilightDelta);
                        }
                        else
                        { // find next sunset
                                jdy = calcJDofNextPrevRiseSet(0, rise, JD, latitude, longitude, timezone, dst, twilightDelta);
                        }

                        //document.getElementById(((rise) ? "risebox" : "setbox")).value = dayString(jdy, 0, 3);

                        return dayString(jdy, 0, 3);
                }
        }
}

function calcJDofNextPrevRiseSet(next, rise, JD, latitude, longitude, tz, dst, twilightDelta)
{
        var julianday = JD;
        var increment = ((next) ? 1.0 : -1.0);

        var time = calcSunriseSetUTC(rise, julianday, latitude, longitude,twilightDelta);
        while (!isNumber(time))
        {
                julianday += increment;
                time = calcSunriseSetUTC(rise, julianday, latitude, longitude,twilightDelta);
        }
        var timeLocal = time + tz * 60.0 + ((dst) ? 60.0 : 0.0);
        while ((timeLocal < 0.0) || (timeLocal >= 1440.0))
        {
                var incr = ((timeLocal < 0) ? 1 : -1);
                timeLocal += (incr * 1440.0);
                julianday -= incr;
        }

        return julianday;
}

Date.prototype.isDST= function()
{
        var tz= this.getTimezoneOffset();
        var D1= new Date();
        var m= 0;
        while(m<12)
        {
                D1.setMonth(++m);
                if(D1.getTimezoneOffset()> tz) return true;
                if(D1.getTimezoneOffset()< tz) return false;
        }

        return false;
};

var jday = getJD();
var tl = getTimeLocal();
var now=new Date();
//fcw: 2013-10-16: wrong calc.: var tz = (now.getTimezoneOffset())/60+now.isDST();
var tz = -now.getTimezoneOffset()/60 - now.isDST();

var dst = now.isDST()?1:0;

var total = jday + tl / 1440.0 - tz / 24.0;

var T = calcTimeJulianCent(total);

//var lat=51.1;
//var lng=-1.1;

var lat2=parseFloat(lat);
var lng2=parseFloat(lng);


calcAzEl(0, T, tl, lat2, lng2, tz);
calcSolNoon(jday, lng2, tz, dst);

//let (rise = calcSunriseSet(1, jday, lat, lng, tz, dst, 0));
//let (set = calcSunriseSet(0, jday, lat, lng, tz, dst, 0));

var rise = calcSunriseSet(1, jday, lat2, lng2, tz, dst, 0);
var ct_start = calcSunriseSet(1, jday, lat2, lng2, tz, dst, 6-.833);
var nt_start = calcSunriseSet(1, jday, lat2, lng2, tz, dst, 12-.833);
var at_start = calcSunriseSet(1, jday, lat2, lng2, tz, dst, 18-.833);
var set = calcSunriseSet(0, jday, lat2, lng2, tz, dst, 0);
var ct_end = calcSunriseSet(0, jday, lat2, lng2, tz, dst, 6-.833);
var nt_end = calcSunriseSet(0, jday, lat2, lng2, tz, dst, 12-.833);
var at_end = calcSunriseSet(0, jday, lat2, lng2, tz, dst, 18-.833);


function lpad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

var monthss = lpad((now.getUTCMonth() + 1), 2); //months from 1-12
var dayss = lpad(now.getUTCDate(), 2);
var yearss = now.getUTCFullYear();
var rises = yearss + monthss + dayss + " " + String(rise).substring(0, 2) + "." + String(rise).substring(3, 5);
var sets = yearss + monthss + dayss + " " + String(set).substring(0, 2) + "." + String(set).substring(3, 5);
