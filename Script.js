/**Copyright 2014 SmartLucas
 *This Bot Was Made By SmartLucas Dont Edit They Yet
 */


 (function () {
 
     var kill = function () {
         ClearInterval(noiseBot.room.autodisableInterval);
         ClearInterval(noiseBot.room.afkInterval;
         noiseBot.status = false;
      };
      
     var storeToStorage = function () {
        localStorage.setItem("noiseBotsettings", JSON.stringify(noiseBot.settings));
        localStorage.setItem("noiseBotRoom", JSON.stringify(noiseBot.room));
        var noiseBotStorageInfo = {
            time: Date.now(),
            stored: true,
            version: noiseBot.version
        };
        localStorage.setItem("noiseBotStorageInfo", JSON.stringify(noiseBotStorageInfo));

      };

    var subChat = function (chat, obj) {
        if (typeof chat === "undefined") {
            API.chatLog("There is a chat text missing.");
            console.log("There is a chat text missing.");
            return "[Error] No text message found.";
        }
        var lit = '%%';
        for (var prop in obj) {
            chat = chat.replace(lit + prop.toUpperCase() + lit, obj[prop]);
        }
        return chat;
     };
      
      var loadChat = function (cb) {
        if (!cb) cb = function () {
        };
        $.get("https://rawgit.com/SmartLucas/basicBot/master/lang/langIndex.json", function (json) {
            var link = noiseBot.chatLink;
            if (json !== null && typeof json !== "undefined") {
                langIndex = json;
                link = langIndex[noiseBot.settings.language.toLowerCase()];
                if (noiseBot.settings.chatLink !== noiseBot.chatLink) {
                    link = noiseBot.settings.chatLink;
                }
                else {
                    if (typeof link === "undefined") {
                        link = noiseBot.chatLink;
                    }
                }
                $.get(link, function (json) {
                    if (json !== null && typeof json !== "undefined") {
                        if (typeof json === "string") json = JSON.parse(json);
                        noiseBot.chat = json;
                        cb();
                    }
                });
            }
            else {
                $.get(noiseBot.chatLink, function (json) {
                    if (json !== null && typeof json !== "undefined") {
                        if (typeof json === "string") json = JSON.parse(json);
                        noiseBot.chat = json;
                        cb();
                    }
                });
            }
        });
    };
    
    var retrieveSettings = function () {
        var settings = JSON.parse(localStorage.getItem("noiseBotsettings"));
        if (settings !== null) {
            for (var prop in settings) {
                noiseBot.settings[prop] = settings[prop];
            }
        }
    };

    var retrieveFromStorage = function () {
        var info = localStorage.getItem("noiseBotStorageInfo");
        if (info === null) API.chatLog(noiseBot.chat.nodatafound);
        else {
            var settings = JSON.parse(localStorage.getItem("noiseBotsettings"));
            var room = JSON.parse(localStorage.getItem("noiseBotRoom"));
            var elapsed = Date.now() - JSON.parse(info).time;
            if ((elapsed < 1 * 60 * 60 * 1000)) {
                API.chatLog(noiseBot.chat.retrievingdata);
                for (var prop in settings) {
                    noiseBot.settings[prop] = settings[prop];
                }
                noiseBot.room.users = room.users;
                noiseBot.room.afkList = room.afkList;
                noiseBot.room.historyList = room.historyList;
                noiseBot.room.mutedUsers = room.mutedUsers;
                noiseBot.room.autoskip = room.autoskip;
                noiseBot.room.roomstats = room.roomstats;
                noiseBot.room.messages = room.messages;
                noiseBot.room.queue = room.queue;
                noiseBot.room.newBlacklisted = room.newBlacklisted;
                API.chatLog(noiseBot.chat.datarestored);
            }
        }
        var json_sett = null;
        var roominfo = document.getElementById("room-info");
        info = roominfo.textContent;
        var ref_bot = "@noiseBot=";
        var ind_ref = info.indexOf(ref_bot);
        if (ind_ref > 0) {
            var link = info.substring(ind_ref + ref_bot.length, info.length);
            var ind_space = null;
            if (link.indexOf(" ") < link.indexOf("\n")) ind_space = link.indexOf(" ");
            else ind_space = link.indexOf("\n");
            link = link.substring(0, ind_space);
            $.get(link, function (json) {
                if (json !== null && typeof json !== "undefined") {
                    json_sett = JSON.parse(json);
                    for (var prop in json_sett) {
                        noiseBot.settings[prop] = json_sett[prop];
                    }
                }
            });
        }

    };

    String.prototype.splitBetween = function (a, b) {
        var self = this;
        self = this.split(a);
        for (var i = 0; i < self.length; i++) {
            self[i] = self[i].split(b);
        }
        var arr = [];
        for (var i = 0; i < self.length; i++) {
            if (Array.isArray(self[i])) {
                for (var j = 0; j < self[i].length; j++) {
                    arr.push(self[i][j]);
                }
            }
            else arr.push(self[i]);
        }
        return arr;
    };
    
    var linkFixer = function (msg) {
        var parts = msg.splitBetween('<a href="', '<\/a>');
        for (var i = 1; i < parts.length; i = i + 2) {
            var link = parts[i].split('"')[0];
            parts[i] = link;
        }
        var m = '';
        for (var i = 0; i < parts.length; i++) {
            m += parts[i];
        }
        return m;
    };

    var botCreator = "DubNoise. SmartLucas";
    var botCreatorIDs = [];
    
