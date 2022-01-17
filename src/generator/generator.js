import * as Blockly from "blockly/core";
import "blockly/javascript";

import { parameters } from "../parameters";

Blockly.JavaScript['header'] = function(block) {
  var dropdown_headerheightdropdown = block.getFieldValue('headerHeightDropdown');
  var checkbox_headerscrollcheckbox = block.getFieldValue('headerScrollCheckbox') == 'FALSE';
  var value_colourinput = Blockly.JavaScript.valueToCode(block, 'colourInput', Blockly.JavaScript.ORDER_ATOMIC);

  parameters.header = true;
  parameters.headerColour = value_colourinput.replaceAll("'", "");
  parameters.headerAlwaysOnTop = checkbox_headerscrollcheckbox;
  if (dropdown_headerheightdropdown == "small") parameters.headerHeight = "50px"
  else if (dropdown_headerheightdropdown == "medium") parameters.headerHeight = "75px"
  else if (dropdown_headerheightdropdown == "high") parameters.headerHeight = "100px"

  return "";
};

Blockly.JavaScript['footer'] = function(block) {
  var dropdown_footerheightdropdown = block.getFieldValue('footerHeightDropdown');
  var value_colourinput = Blockly.JavaScript.valueToCode(block, 'colourInput', Blockly.JavaScript.ORDER_ATOMIC);

  parameters.footer = true;
  parameters.footerColour = value_colourinput.replaceAll("'", "");

  if (dropdown_footerheightdropdown == "small") parameters.footerHeight = "50px"
  else if (dropdown_footerheightdropdown == "medium") parameters.footerHeight = "75px"
  else if (dropdown_footerheightdropdown == "high") parameters.footerHeight = "100px"
  
  return "";
};

Blockly.JavaScript['section'] = function(block) {
  var dropdown_sectionOrderingDropdown = block.getFieldValue('sectionHeightDropdown');
  var checkbox_sectionDateField = block.getFieldValue('sectionDateField') == 'TRUE';
  var value_backgroundcolourinput = Blockly.JavaScript.valueToCode(block, 'backgroundColourInput', Blockly.JavaScript.ORDER_ATOMIC);
  var textSettings = Blockly.JavaScript.statementToCode(block, 'elementsInput');

  console.log(checkbox_sectionDateField);

  parameters.sectionBackgroundColour = value_backgroundcolourinput.replaceAll("'", "");
  parameters.sectionDateField = checkbox_sectionDateField;
  parameters.sectionOrdering = dropdown_sectionOrderingDropdown;

  return "SECTIONEXISTS";
};

Blockly.JavaScript['textfield'] = function(block) {
  var dropdown_textsizedropdown = block.getFieldValue('textSizeDropdown');
  var dropdown_textalignmentdropdown = block.getFieldValue('textAlignmentDropdown');
  var value_textcolourinput = Blockly.JavaScript.valueToCode(block, 'textColourInput', Blockly.JavaScript.ORDER_ATOMIC);

  if (dropdown_textsizedropdown == "standart") parameters.textSize = "12px"
  else if (dropdown_textsizedropdown == "bigger") parameters.textSize = "16px"
  else if (dropdown_textsizedropdown == "paragraphTitle") parameters.textSize = "24px"; 

  parameters.textColour = value_textcolourinput.replaceAll("'", "");
  parameters.textAlignment = dropdown_textalignmentdropdown;
  
  // TODO: Assemble JavaScript into code variable.
  return "";
};

Blockly.JavaScript['image'] = function(block) {
  var dropdown_imagesize = block.getFieldValue('imageSize');
  var dropdown_imagealignment = block.getFieldValue('imageAlignment');
  var code = '...;\n';
  return code;
};

