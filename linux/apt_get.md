### Using apt-get commands in linux (complete beginners guide)

This beginner's guide shows you what you can do with apt-get commands in linux, how to user it to find new packages, install and upgrade new packages and clean your system.

In fact, first in the list of things to do after installing Ubuntu is to use apt-get update and apt-get upgrade. Now,you might be aware of a few commands and their usage but perhaps hou might not be aware of other apt-get commands and their usage.

I am going to explain various of apt-get commands with examples so that you can use them as an expert linux user.

What is apt-get?

Ubuntu is derived from Debian Linux. And Debian uses dpkg packaging system. A packaging system is a way to provide programs and applications for installation. This way, you don't have to build a program from the source code.

APT(Advanced Package Tool) is the command line tool to interact with this packaging system. There is already dpkg commands to manage it. But apt is more friendly to handle packging. You can use it to find and install new packages, upgrade packages, clean the packages.

There are two main tool arount it: apt-get and apt-cache. apt-get is for installing,upgrading and cleaning package while apt-cache is used for finding new package. We'll see all these commands with examples later in this guide.

#### Using apt-get commands

##### Update package database with apt-get

apt-get basically works on a database of available packages. if you don't update this database, the system won't know if there are newer packages available or note. In fact, this is the first command you need to run in any Linux system after a fresh install.

> sudo apt-get update

When you run this command, you'll see the information being retrieved from various servers.

You'll see three types of lines here, hit, get and ign. Let me explain that to you:

* hit:  there is no change in package version
* ign:  the package is being ignored. There could be various reasons for that. Either the package is way too recent that it doesn't even bother to check or there was an error in retrieving the file but error was trivial and thus it is beging ignored. This is not an error. There is no need to be worried.
* get:  There is a new version available. It will download the information(not the package itself). You can see that there are download information with the 'get' line in the screenshot above.

##### Upgrade installed package with apt-get

Once you have updated the package database, you can upgrade the installed package. The most convenient way is to upgrade all the packages that have updates available. You can use the command below for this purpose:

> sudo apt-get upgrade

To upgrade only a specify program, use the command below:


















