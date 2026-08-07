# Why won’t my videos autoplay?

There are a number of sections in our themes that support videos and most of them autoplay when the page loads. There are a few restrictions to be aware of:

**Doesn’t autoplay on mobile**

While autoplaying muted videos work on many mobile devices, if that device is in _low power mode_ they won’t autoplay at all. This is most often caused by the iOS battery saver mode or based on a slow connection. Sometimes the cause isn’t known but the phone decides it can’t autoplay videos anyway. This isn’t something we’re able to bypass, but instead our code checks for that state and shows the video’s play button so users can still interact and watch the video if they’d like.

**Where’s the sound?**

While the majority of browsers support autoplaying video, since about 2018 most of them have disabled starting videos if they have sound. Therefore we do not have an option to include autoplaying videos with sound and do not suggest attempting it yourself.

**Video takes over the whole page on my phone**

Some devices don’t allow videos to play inline and behind other elements. Instead, once you click to play them, they enter full screen mode. This was the case for many older iOS devices but they have since moved away from that functionality. If you are still experiencing this, it’s not something our theme can work around as it is functionality defined by the phone itself.
