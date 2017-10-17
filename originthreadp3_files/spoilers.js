




/*
     FILE ARCHIVED ON 0:19:09 Nov 21, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 1:11:01 Jul 14, 2014.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
var SpoilersPlugin = {
   FindAndReplace: function() {
      $('div.UserSpoiler').each(function(i, el) {
         SpoilersPlugin.ReplaceSpoiler(el);
      });
   },

   ReplaceComment: function(Comment) {
      $(Comment).find('div.UserSpoiler').each(function(i,el){
         SpoilersPlugin.ReplaceSpoiler(el);
      },this);
   },

   ReplaceSpoiler: function(Spoiler) {
      // Don't re-event spoilers that are already 'on'
      if (Spoiler.SpoilerFunctioning) return;
      Spoiler.SpoilerFunctioning = true;

      // Extend object with jQuery
      Spoiler = $(Spoiler);
      var SpoilerTitle = Spoiler.find('div.SpoilerTitle').first();
      var SpoilerButton = document.createElement('input');
      SpoilerButton.type = 'button';
      SpoilerButton.value = 'show';
      SpoilerButton.className = 'SpoilerToggle';
      SpoilerTitle.append(SpoilerButton);
   },

   ToggleSpoiler: function(Spoiler, SpoilerButton) {
      var ThisSpoilerText = Spoiler.find('div.SpoilerText').first();
      var ThisSpoilerStatus = ThisSpoilerText.css('display');
      var NewSpoilerStatus = (ThisSpoilerStatus == 'none') ? 'block' : 'none';
      ThisSpoilerText.css('display',NewSpoilerStatus);

      if (NewSpoilerStatus == 'none')
         SpoilerButton.val('show');
      else
         SpoilerButton.val('hide');
   }
};

// Events!

jQuery(document).ready(function(){
   SpoilersPlugin.FindAndReplace();
});

jQuery(document).bind('CommentPagingComplete',function() {
   SpoilersPlugin.FindAndReplace();
});

jQuery(document).bind('CommentAdded', function() {
   SpoilersPlugin.FindAndReplace();
});

jQuery('input.SpoilerToggle').livequery('click',function(event){
   var Spoiler = $(event.target).parents('div.UserSpoiler');
   SpoilersPlugin.ToggleSpoiler(Spoiler, $(event.target));
});