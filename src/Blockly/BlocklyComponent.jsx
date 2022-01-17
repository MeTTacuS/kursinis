import React from 'react';
import './BlocklyComponent.css';

import Blockly from 'blockly/core';
import locale from 'blockly/msg/en';
import 'blockly/blocks';

Blockly.setLocale(locale);

class BlocklyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.blocklyDiv = React.createRef();
        this.toolbox = `<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">
    <category name="Dizaino dalys" colour="#5b80a5">
        <block type="header">
        <field name="headerHeightDropdown">small</field>
        <field name="headerScrollCheckbox">FALSE</field>
        <field name="imageNeededCheckbox">FALSE</field>
        </block>
        <block type="section">
        <field name="sectionHeightDropdown">small</field>
        <value name="backgroundColourInput">
            <block type="colour_picker">
            <field name="COLOUR">#ffffff</field>
            </block>
        </value>
        </block>
        <block type="footer">
        <field name="footerHeightDropdown">small</field>
        </block>
    </category>
    <category name="Tekstas" colour="#9fa55b">
        <block type="textfield">
        <field name="textSizeDropdown">standart</field>
        <field name="textAlignmentDropdown">centeredAlignment</field>
        <value name="textColourInput">
            <block type="colour_picker">
            <field name="COLOUR">#000000</field>
            </block>
        </value>
        </block>
    </category>
    <category name="Paveiksliukai" colour="#5ba55b">
        <block type="image">
        <field name="imageSize">medium</field>
        <field name="imageAlignment">center</field>
        </block>
    </category>
    <category name="Spalvos" colour="#a55b80">
        <block type="colour_rgb">
        <value name="RED">
            <shadow type="math_number">
            <field name="NUM">100</field>
            </shadow>
        </value>
        <value name="GREEN">
            <shadow type="math_number">
            <field name="NUM">50</field>
            </shadow>
        </value>
        <value name="BLUE">
            <shadow type="math_number">
            <field name="NUM">0</field>
            </shadow>
        </value>
        </block>
        <block type="colour_picker">
        <field name="COLOUR">#ff0000</field>
        </block>
        <block type="colour_blend">
        <value name="COLOUR1">
            <shadow type="colour_picker">
            <field name="COLOUR">#ff0000</field>
            </shadow>
        </value>
        <value name="COLOUR2">
            <shadow type="colour_picker">
            <field name="COLOUR">#3333ff</field>
            </shadow>
        </value>
        <value name="RATIO">
            <shadow type="math_number">
            <field name="NUM">0.5</field>
            </shadow>
        </value>
        </block>
    </category>
</xml>`;
    }

    componentDidMount() {
        const { initialXml, children, ...rest } = this.props;
        this.primaryWorkspace = Blockly.inject(
            this.blocklyDiv.current,
            { 
                toolbox : this.toolbox, 
                collapse : true, 
                comments : true, 
                disable : true, 
                maxBlocks : Infinity, 
                trashcan : true, 
                horizontalLayout : false, 
                toolboxPosition : 'start', 
                css : true, 
                media : 'https://blockly-demo.appspot.com/static/media/', 
                rtl : false, 
                scrollbars : true, 
                sounds : true, 
                oneBasedIndex : true
            },
        );

        if (initialXml) {
            Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), this.primaryWorkspace);
        }
    }

    get workspace() {
        return this.primaryWorkspace;
    }

    setXml(xml) {
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), this.primaryWorkspace);
    }

    render() {
        const { children } = this.props;

        return <React.Fragment>
            <div ref={this.blocklyDiv} id="blocklyDiv" />
            <xml xmlns="https://developers.google.com/blockly/xml" is="blockly" style={{ display: 'none' }} ref={this.toolbox}>
                {children}
            </xml>
        </React.Fragment>;
    }
}

export default BlocklyComponent;
