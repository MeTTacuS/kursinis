import * as Blockly from "blockly/core";

import "../fields/BlocklyReactField";
import "../fields/DateField";

Blockly.Blocks['header'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Virsutine puslapio dalis");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["Zemas","small"], ["Vidutinis","medium"], ["Aukstas","high"]]), "headerHeightDropdown")
        .appendField("aukstis");
    this.appendDummyInput()
        .appendField("Visuomet puslapio virsuje")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "headerScrollCheckbox");
    this.appendValueInput("colourInput")
        .setCheck(null)
        .appendField("Spalva");
    this.setNextStatement(true, ["footer", "section"]);
    this.setColour(210);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['footer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Apatine puslapio dalis");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["Zemas","small"], ["Vidutinis","medium"], ["Aukstas","high"]]), "footerHeightDropdown")
        .appendField("aukstis");
    this.appendValueInput("colourInput")
        .setCheck(null)
        .appendField("Spalva");
    this.setPreviousStatement(true, ["header", "section"]);
    this.setColour(210);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['textfield'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Teksto dydis")
        .appendField(new Blockly.FieldDropdown([["standartinis","standart"], ["didesnis","bigger"], ["paragrafo pavadinimas","paragraphTitle"]]), "textSizeDropdown");
    this.appendDummyInput()
        .appendField("Teksto rikiavimas")
        .appendField(new Blockly.FieldDropdown([["centruotas","center"], ["kairinis","left"], ["desininis","right"]]), "textAlignmentDropdown");
    this.appendValueInput("textColourInput")
        .setCheck(null)
        .appendField("Teksto spalva ");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['section'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Sekciju nustatymai");
    this.appendDummyInput()
        .appendField("Sekciju issidestymas is")
        .appendField(new Blockly.FieldDropdown([["kaires i desine","leftToRight"], ["virsaus i apacia","topToBottom"]]), "sectionHeightDropdown");
    this.appendDummyInput()
        .appendField("Datos laukas")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "sectionDateField");
    this.appendValueInput("backgroundColourInput")
        .setCheck(null)
        .appendField("Fono spalva");
    this.appendStatementInput("elementsInput")
        .setCheck("textfield")
        .appendField("Teksto Nustatymai");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['image'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Paveiksliuko dydis")
        .appendField(new Blockly.FieldDropdown([["vidutinis","medium"], ["nedidelis","small"], ["didelis","large"]]), "imageSize");
    this.appendDummyInput()
        .appendField("Paveiksliuko pozicija")
        .appendField(new Blockly.FieldDropdown([["centruota","center"], ["kairine","left"], ["desinine","right"]]), "imageAlignment");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};