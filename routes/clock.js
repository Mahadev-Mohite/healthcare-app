
                    console.log("what happens");
                    document.addEventListener("DOMContentLoaded", function () {
                        var currentTime = new Date();
                        var blogTime = new Date('<%= blog.time %>');
                
                        if (currentTime.getHours() === blogTime.getHours() &&
                            currentTime.getMinutes() === blogTime.getMinutes()) {
                            var audio = new Audio('public/images/bestringtones.net_colour-photo-bgm.mp3');
                
                            // Play the audio when the 'canplaythrough' event is fired
                            audio.addEventListener('canplaythrough', function () {
                                audio.play();
                            });
                
                            // Handle errors
                            audio.addEventListener('error', function (error) {
                                console.error('Error loading audio:', error);
                            });
                        }
                    });
