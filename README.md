IL-2 Horus Team Projects
========================

This is the root of a set of projects developed by IL-2 Horus Team. These
projects are related to [IL-2 Sturmovik](http://en.wikipedia.org/wiki/IL-2_Sturmovik_%28game%29).

The main purpose is creation of free tools, online services and dedicated
server commanders for IL-2, providing support of its latest patches and
extension of default server's functionality in contrast to known server
commanders such as [IL2 Server Commander](http://wiki.sturmovik.de/index.php?title=IL2_Server_Commander_English_Version) and [FBDj](http://sourceforge.net/projects/fbdj/).

Our main principle is providing free for non-commercial use robust software
related with IL-2.

* You can use our [il2ds-log-parser](https://github.com/IL2HorusTeam/il2ds-log-parser)
Python library to parse server event logs.
* [il2ds-middleware](https://github.com/IL2HorusTeam/il2ds-middleware) Python
library will provide for you high-level access to server's console via
TCP socket in non-blocking mode, server's [DeviceLink interface](https://docs.google.com/document/d/1mIAa-sMQhLFyHgDdRpABwFZ9TW0Yxcwr9Lc2jTmTGtI/edit?usp=sharing) via UPD socket and
will automatically read and parse events from server log into Python objects.
* Our [maps](https://github.com/IL2HorusTeam/projects/tree/master/maps)
projects are related to creating tools for working with different kinds of maps
of locations presented in IL-2. Among them you will find [il2-heightmap-creator](https://github.com/IL2HorusTeam/il2-heightmap-creator) tool, which creates binary heightmaps
for locations which can be used for rendering height and plain maps. You
can browse and download [topographical, height and plain maps here](https://copy.com/uKwaDtRBJKix).
Another maps-related projecs are called to create libraries and services for
working with maps online.

Our current work is related to creation of [il2ds-events-commander](https://github.com/IL2HorusTeam/il2ds-events-commander). This is a special kind of server commanders which is used to
rule online historical staged events. It is a step for creation of
general-purpose IL-2 server commanders and commanders for special "war"
projects such as [Mist Of War](http://il2.aviasibir.ru/mow/?lang=en),
[Air Dominition War](http://adw.the-war.org/ru/),
[Nullwar](http://www.nullwar.com/), etc.
