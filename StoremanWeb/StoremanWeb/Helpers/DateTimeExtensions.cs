using System;
using System.Text.RegularExpressions;

namespace StoremanWeb.Helpers
{
    public static class DateTimeExtensions
    {
        public static string ToDbString(this DateTime date)
        {
            var a = ("00" + date.Month.ToString());
            a = a.Substring(a.Length - 2);

            var b = ("00" + date.Day.ToString());
            b = a.Substring(b.Length - 2);

            return $"{date.Year}-{a}-{b}";
        }

        public static DateTime FromDbString(this string date)
        {
            Regex regex = new Regex("(?'y'\\d+)-(?'m'\\d+)-(?'d'\\d+)");
            if (regex.IsMatch(date))
            {
                var m = regex.Match(date);
                var yearGroup = m.Groups["y"];
                var monthGroup = m.Groups["m"];
                var dayGroup = m.Groups["d"];

                return new DateTime(int.Parse(yearGroup.Value), int.Parse(monthGroup.Value), int.Parse(dayGroup.Value));
            }
            else
                throw new ArgumentException("Invalid date string");

        }

    }
}
