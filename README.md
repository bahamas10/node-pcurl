pcurl
=====

Concurrently curl a list of hosts and print the results

![Pcurl](http://www.daveeddy.com/static/media/github/pcurl.png)

Usage
-----

Used as a command line tool

    pcurl url1 url2 url3 ...

or pipe through stdin

    pcurl < newline_sep_list_of_urls.txt

Examples
--------

Use bash expansion to hit multiple URLs at the same time, and report the results

    $ pcurl http://ifconfig.me/{ip,host,ua,port,lang,connection}
    URL                            CODE  BODY
    http://ifconfig.me/connection  200   keep-alive
    http://ifconfig.me/host        200   host.isp.net
    http://ifconfig.me/ip          200   2.6.9.8
    http://ifconfig.me/lang        404
    http://ifconfig.me/port        200   41699
    http://ifconfig.me/ua          200

Or send the same data through stdin

    $ printf "%s\n" http://ifconfig.me/{ip,host,ua,port,lang,connection}
    http://ifconfig.me/ip
    http://ifconfig.me/host
    http://ifconfig.me/ua
    http://ifconfig.me/port
    http://ifconfig.me/lang
    http://ifconfig.me/connection
    $ printf "%s\n" http://ifconfig.me/{ip,host,ua,port,lang,connection} | pcurl
    URL                            CODE  BODY
    http://ifconfig.me/connection  200   keep-alive
    http://ifconfig.me/host        200   host.isp.net
    http://ifconfig.me/ip          200   2.6.9.8
    http://ifconfig.me/lang        404
    http://ifconfig.me/port        200   41699
    http://ifconfig.me/ua          200

Limitations
-----------

* Only supports GET requests
* Meant to receive small body data
* Hardcoded 10 second timeout

Install
-------

    npm install -g pcurl

License
-------

MIT
