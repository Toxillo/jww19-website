<!-- English -->
## Using a Router (recommended)

You will need:
- 1 Ethernet cable
- A router with an ethernet WAN port
- The list of static IP addresses as well as the default gateway provided to you by the Studierendenwerk
- A laptop or PC to connect to the router. If it doesn't have Wi-Fi, you can connect to one of the LAN-ports using an ethernet cable.

In this guide we will be using a *TP-Link TL-WR841N* router (displayed below) to illustrate the steps.

![router example](/img/info/internet/router-example.webp)

There is some useful information on the back of the router which you will need to set up your router. We've marked the **model number** with purple, the **default Wi-Fi password** with orange and the **default router access username and password** with red and yellow, respectively.

![backside of router](/img/info/internet/back-of-router.webp)

### Setting It Up

1. Plug in your router and turn it on (it's lights should turn on).
2. Plug the one end of the ethernet cable into the WAN port of your router and the other end into the ethernet port in your room.
3. Connect your laptop or PC to the router using either another ethernet cable or connecting to it's Wi-Fi network using the **default Wi-Fi password**. For our router, a Wi-Fi network named *TP_Link_* followed by the model number of the router will be displayed. The Wi-Fi network name of the router is also called it's _SSID_. The Wi-Fi network might take a while to set up.
4. Go to the router's settings page in your browser. Usually you access the router via it's IP address or a special address. Most router's use something like [192.168.0.1](192.168.0.1) and you can find the addresses and default login details of most routers [here](https://router-network.com/) (in case you can't find it on your router or manual). 
   
   In our case we need to go to the special address http://tplinklogin.net and are shown a login dialog.

   ![router login dialog](/img/info/internet/router-login-dialog.webp)
5. You need to log in to your router's setting page using it's **default username and password**. In our case the username is `admin` and the password is `admin`.
6. Once you've logged in, you need to make your router use a static IP address and set it to one of the IP addresses provided to you by the Studierendenwerk. In our case this means navigating to `Network > WAN`, choosing the the connection type `Static IP` and setting the `IP address` as well as the `Default Gateway` to the addresses provided by the Studierendenwerk.
   
   ![router settings page step 1](/img/info/internet/router-ui-1.webp)
7. It's highly recommended to change the name of your Wi-Fi network. For our router, we need to navigate to `Wireless > Wireless Settings` to change it.
   
   ![router settings page step 2](/img/info/internet/router-ui-2.webp)
8. Finally, you should ensure that your Wi-Fi network is secured by some kind of password. We will go ahead and enable WPA/WPA2 on our router on the `Wireless > Wireless Security` page and set the password.
   
   ![router settings page step 3](/img/info/internet/router-ui-3.webp)

Congrats 🎉, you should now have a working internet connection. If it's not the case, please [contact a network admin](/en/index.html#contact).

<!-- Deutsch -->
## Mit einem Router (empfohlen)

Du benötigst: 
- 1 Ethernet-Kabel
- Einen Router mit einem Ethernet WAN-Port
- Die Liste von statischen IP Adressen, sowie den Default Gateway vom Studierendenwerk
- Einen Laptop oder PC um dich mit dem Router zu verbinden. Falls dein Laptop/PC kein WLAN haben sollte, kannst du ihn über ein Ethernet-Kabel mit einem der LAN-Ports von deinem Router verbinden.

In dieser Anleitung werden wir beispielhaft den *TP-Link TL-WR841N* Router verwenden: 

![Routerbeispiel](/img/info/internet/router-example.webp)

Auf der Rückseite der meisten Router findest du wichtige Informationen. Wir haben auf unserem Router die **Modelnummer** mit lila, das **Standard-WLAN-Passwort** mit orange und die **Standard-Logindaten** mit rot und gelb gekennzeichnet.

![Rückseite des Routers](/img/info/internet/back-of-router.webp)

### Einrichtung

1. Versorge deinen Router mit Strom und schalte ihn an (die Lichter sollten angehen).
2. Steck ein Ende des Ethernet-Kabels in das WAN-Port des Routers und das andere in das Ethernet-Port in deinem Zimmer.
3. Verbinde jetzt deinen Laptop oder PC mit einem Ethernet-Kabel oder indem du dich mit dem WLAN des Routers verbindest. Für das WLAN des Routers solltest du das **Standard-WLAN-Passwort** benutzen. In unserem Fall heißt das WLAN-Netzwerk (auch _SSID_ genannt) *TP_Link_* gefolgt von der **Modelnummer**. Es kann eine kurze weile dauern, bis das WLAN-Netzwerk zu sehen ist.
4. Als nächstest musst du deinen Router auf der Einstellungsseite konfigurieren. Normalweise kannst du diese über die IP-Adresse oder einer besonderen Web-Adresse erreichen. Die IP-Adresse der meisten Router ist [192.168.0.1](192.168.0.1), aber du kannst die IP-Adresse und Standardlogindaten deines Routers auch auf [dieser Seite](https://router-network.com/) finden, falls sie nicht auf deinem Router oder in der Routeranleitung stehen. 
   
   In unserem Fall müssen wir die besondere Web-Adresse http://tplinklogin.net aufrufen und bekommen einen Login-Dialog zu sehen:
   
   ![Router Logindialog](/img/info/internet/router-login-dialog.webp)
5. Nun musst du dich mit den **Standard-Logindaten** deines Routers einloggen. In unserem Fall ist der Benutzername `admin` und das Passwort ebenfalls `admin`.  

6. Nachdem du dich eingelogged hast, musst du deinen Router konfigurieren eine statische IP Adresse zu benutzen und sie dann auf einer der Adressen vom Studierendenwerk setzen. In unserem Fall müssen wir zu `Network > WAN` navigieren, den _connection type_ `Static IP` wählen und die `IP address`, sowie die `Default Gateway` Felder auf einen der Werte vom Studierendenwerk setzen.
   
   ![Router Schritt 1](/img/info/internet/router-ui-1.webp)
7. Wir empfehlen stark, dass ihr den Namen eures WLAN Netzwerkes ändert. Bei unserem Router kann man das unter `Wireless > Wireless Settings` machen.
   
   ![Router Schritt 2](/img/info/internet/router-ui-2.webp)
8. Zuletzt solltest du noch mal sicher gehen, dass dein WLAN-Netzwerk auch wirklich gesichert ist und ein Passwort benötigt. Dafür müssen wir bei unserem Router unter `Wireless > Wireless Security` _WPA/WPA2_ wählen und können das Passwort setzen.
   
   ![Router Schritt 3](/img/info/internet/router-ui-3.webp)

Herzlichen Glückwunsch 🎉, du solltest jetzt eine funktionierende Internetverbindung haben. Falls es nicht geklappt hat, [schreib bitte einen Netzwerkadmin an](/de/index.html#contact).
