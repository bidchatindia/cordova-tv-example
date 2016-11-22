/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        initAllElements();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

function initAllElements() {
    setUpJwPlayer("http://localhost/8127_9773_980_converted.mp4");
    var parentElement = document.getElementById("helloworld");
    parentElement.addEventListener("click", function() {
        getAPIData();
    });
}

function getAPIData() {

    $.ajax({
        url: "https://videowest.bidchatserver.com/superadmin/tv/v1/top",
        type: 'GET',
        dataType: 'json',
        headers: {
            'Authorization': 'Basic YmlkY2hhdF9hZG1pbl9zdTp1ZiZLOVlWdSVFJEo5bnco'
        },
        contentType: 'application/json; charset=utf-8',
        success: function(result) {
            $.each(result, function(key, value) {
                var $newLi = $( "<li>" + value.hash_tag1 + value.hash_tag2 + "</li>" );
                $newLi.click(function () {
                    alert(value.video_url);
                    setUpJwPlayer(value.lowres_video_url);
                });
                $("#lst_all_broadcast").append($newLi);
                // $("#lst_all_broadcast li").last().click(function () {
                //     alert(value.hash_tag1);
                // });
            });
            //alert($("#lst_all_broadcast").html());
            // alert("DATA: " + result);
        },
        error: function(error) {
            alert("Error:" + error);
        }
    });
}


function setUpJwPlayer(url) {
    var hlsConfig={
            maxFragLookUpTolerance :0,
            maxBufferLength: 30, 
            xhrSetup: function(xhr, url) {
                xhr.setRequestHeader("Cache-Control","no-cache,max-age=0");
                xhr.setRequestHeader("pragma", "no-cache");
            }
        };
    window.jwplayer = jwplayer;
    jwplayer.key = "U1gEkqhHjYKdIw/gU5KtKRl8j/Ut6gL0i1Qc39IwSdU=";

    jwplayer("div-jwplayer").setup({
            //hlshtml:true,
            width: '100%',
            height: ((2*$('#div-jwplayer').outerWidth())/3)+"px",
            aspectratio: "16:9",
            stretching:"uniform",
            hlsjsConfig: hlsConfig,
            autostart: true,
            preload:"auto",
            icons: false, // disable a big play button on the middle of screen
            // controls: controls,
            
            playlist: [{
                //file: videoUrl//,
                //image: g_thumb_image_url_web
                sources: [{
                    file: url
                }]
            }],
            cast:{
                appid:"4E60BA0D",
                // logo:base_url+"images/logo.png",
                railcolor:"#e31e76"
            },
            title: 'Bidchat',
            p2pConfig:{
                streamrootKey: "ry-qp2f6njf",
                activateP2P : false
            },
            logo: {
                file: 'images/logo.png',
                link: 'https://www.bidchat.com/',
                position: 'bottom-right'
            },
            sharing: {
                heading: "Share this moment",
                code: "",
                link: url,
                sites: ["facebook","twitter","linkedin","tumblr","googleplus"]
            },
            skin: {
                name: "roundster",
                active: "red",
                inactive: "white",
                background: "black"
            },
            abouttext: "Bidchat: Be part of the show.",
            aboutlink: "https://www.bidchat.com",
            //ga: {} ,
            events:{
                onTime: function(event) {
                /* var time = Math.floor(event.position);
                    if(time != old_time){
                        counter++;
                        old_time = time;
                        prevPlayingTime=old_time;
                    }*/
                }
            }
        });
}
