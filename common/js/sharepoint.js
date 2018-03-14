// - - - - - - - - - - - - - SHAREPOINT STYLING OVERRIDES - - - - - - - - - - - - - //

// Sharepoint Scrolling Fix - critical for standards-compliant browser interaction
// http://kyleschaeffer.com/sharepoint/sharepoint-2010-scrolling/
//
// Sharepoint disables body scrolling and uses Javascript to fix ribbon in position.
// This JS, in conjunction with the associated _sharepoint.scss styles, reverses that behavior.
// This is usesful for creating fixed-position navigation among other things.
// NOTE: ensure you remove the 'scroll="no"' property off the body tag on the master page.

function FixRibbonAndWorkspaceDimensions(){
  ULSxSy:;
  g_frl = true;
  var elmRibbon = GetCachedElement("s4-ribbonrow");
  var elmWorkspace = GetCachedElement("s4-workspace");
  var elmTitleArea = GetCachedElement("s4-titlerow");
  var elmBodyTable = GetCachedElement("s4-bodyContainer");
  if(!elmRibbon || !elmWorkspace || !elmBodyTable){
    return;
  }
  if (!g_setWidthInited){
    var setWidth = true;
    if (elmWorkspace.className.indexOf("s4-nosetwidth") > -1)
      setWidth = false;
    g_setWidth = setWidth;
    g_setWidthInited = true;
  }
  else{
    var setWidth = g_setWidth;
  }
  var baseRibbonHeight = RibbonIsMinimized() ? 44 : 135;
  var ribbonHeight = baseRibbonHeight + g_wpadderHeight;
  if(GetCurrentEltStyle(elmRibbon, "visibility") == "hidden"){
    ribbonHeight = 0;
  }

  // Override default resizing behavior
  // -- adds padding to the top of the "s4-workspace" <div> if the ribbon exists and has content
  // -- allows the ribbon to be positioned using CSS instead of JavaScript (more accessible)
  // -- checks to see if the page is inside a "no-ribbon" dialog
  if(elmRibbon.children.length > 0 && document.getElementsByTagName("html")[0].className.indexOf('ms-dialog-nr') == -1){
    elmWorkspace.style.paddingTop = ribbonHeight + 'px';
  }
}