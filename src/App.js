import React from "react";
import "./App.css";
import BlocklyComponent, { Block } from "./Blockly";
import BlocklyJS from "blockly/javascript";
import "./blocks/customblocks";
import "./generator/generator";
import JSZip from "jszip";
import FileSaver from 'file-saver';

import { parameters } from "./parameters";
import {bootstrapJs, bootstrapCss} from "./bootstrapContent";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.simpleWorkspace = React.createRef();
  }

  generateCode = async () => {
    var code = BlocklyJS.workspaceToCode(this.simpleWorkspace.current.workspace);

    if (!code.includes("SECTIONEXISTS"))
    {
      alert("Nepridetas sekcijos blokas!")
      return;
    }

    console.log(parameters);

    if (parameters.sectionOrdering === "topToBottom")
    {

    var htmlContent = `<?php

get_header();

if ( have_posts() ) :
  while ( have_posts() ) : the_post(); ?>

        <article class="post">
            <h2><?php the_title(); ?></h2>
            ` + (parameters.sectionDateField === true ?  "<h4>Posted on <?php the_time('F jS, Y') ?></h4>" : "") + `
      <?php the_content() ?>
        </article>
  
  <?php endwhile;

else :
  echo '<p>There are no posts!</p>';

endif;

get_footer();

?>
`;

    var cssContent = `/*
Theme Name: customtheme
Author: Nedas
Author URI: http://localhost:3000/
Version: 1.0
*/

body {
  font-family: Arial, sans-serif;
  background-color: ${parameters.sectionBackgroundColour};
  color: ${parameters.textColour};
  font-size: ${parameters.textSize};
  text-align: ${parameters.textAlignment}
}

a:link, a:visited {
  color: #4285f4;
}

p {
  line-height: 1.7em;
}

div.container {
  max-width: 960px;
  margin: 0 auto;
}

article.post {
  border-bottom: 4px dashed #ecf0f1;
}

article.post:last-of-type {
  border-bottom: none;
}

.site-header {
  border-bottom: 3px solid ${parameters.headerColour};
  height: ${parameters.headerHeight};
  background-color: ${parameters.headerColour} !important;
  text-align: center;
}

.site-footer {
  border-top: 3px solid ${parameters.footerColour};
  height: ${parameters.footerHeight};
  background-color: ${parameters.footerColour} !important;
  text-align: center;
}
`;
    var headerContent = `<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <title><?php bloginfo( 'name' ); ?></title>
  <?php wp_head() ?>
</head>

<body <?php body_class(); ?>>
<div class="container">
    <header class="site-header">
        <h1><a href="<?php echo home_url(); ?>"><?php bloginfo( 'name' ); ?></a></h1>
        <h4><?php bloginfo( 'description' ); ?></h4>
    </header>`;

    var footerContent = `<footer class="site-footer">
    <p><?php bloginfo( 'name' ) ?></p>
</footer>
</div> <!-- closes <div class=container"> -->

<?php wp_footer() ?>
</body>
</html>`;

    var functionsContent = `<?php

function custom_theme_assets() {
  wp_enqueue_style( 'style', get_stylesheet_uri() );
}

add_action( 'wp_enqueue_scripts', 'custom_theme_assets' );`;
      const zip = new JSZip();
      zip.file("index.php", htmlContent);
      zip.file("style.css", cssContent);
      zip.file("header.php", headerContent);
      zip.file("footer.php", footerContent);
      zip.file("functions.php", functionsContent);
      zip.generateAsync({ type: 'blob' }).then(function (content) {
          FileSaver.saveAs(content, 'download.zip');
      });
    }
    else if (parameters.sectionOrdering === "leftToRight")
    {
      var headerContent2 = `<html>
<head>
<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri().'/js/jquery.js'; ?>">
</script>
<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri().'/js/jquery-ui.min.js'; ?>">
</script>
<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri().'/bootstrap.js'; ?>">
</script>
<link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri().'/bootstrap.css'; ?>">
<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>">
</head>

<body>

<header class="site-header">
  <h1><a href="<?php echo home_url(); ?>"><?php bloginfo( 'name' ); ?></a></h1>
  <h4><?php bloginfo( 'description' ); ?></h4>
</header>
</div>
<div class="container">
`
      var htmlContent2 = `<?php get_header(); ?>
<div id="ttr_main" class="row">
<div id="ttr_content" class="col-lg-12 col-sm-12 col-md-12 col-xs-12">

<div class="row">
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
<div class="col-lg-4 col-sm-4 col-md-4 col-xs-12">
<h1><?php the_title(); ?></h1>
` + (parameters.sectionDateField === true ?  "<h4>Posted on <?php the_time('F jS, Y') ?></h4>" : "") + `
<p><?php the_content(__('(more...)')); ?></p>
</div>
<?php endwhile; else: ?>
<p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
<?php endif; ?>
</div>
</div>
</div>

<?php get_footer(); ?>
      
      `

      var footerContent2 = `<footer class="site-footer">
<p><?php bloginfo( 'name' ) ?></p>
</footer>
</div> <!-- closes <div class=container"> -->

<?php wp_footer() ?>
</body>
</html>`

      var cssContent2 = `/*
Theme Name: customtheme
Author: Nedas
Author URI: http://localhost:3000/
Version: 1.0
*/
body {
  font-family: Arial, sans-serif;
  background-color: ${parameters.sectionBackgroundColour};
  color: ${parameters.textColour};
  font-size: ${parameters.textSize};
  text-align: ${parameters.textAlignment}
}
.title
{
font-size: 11pt;
font-family: verdana;
font-weight: bold;
}
.site-header {
  border-bottom: 3px solid ${parameters.headerColour};
  height: ${parameters.headerHeight};
  background-color: ${parameters.headerColour} !important;
  text-align: center;
}
.site-footer {
  border-top: 3px solid ${parameters.footerColour};
  height: ${parameters.footerHeight};
  background-color: ${parameters.footerColour} !important;
  text-align: center;
}
`

      var functionsContent2 = `<?php

function custom_theme_assets() {
  wp_enqueue_style( 'style', get_stylesheet_uri() );
}

add_action( 'wp_enqueue_scripts', 'custom_theme_assets' );`;

      const zip = new JSZip();
      zip.file("index.php", htmlContent2);
      zip.file("style.css", cssContent2);
      zip.file("header.php", headerContent2);
      zip.file("footer.php", footerContent2);
      zip.file("functions.php", functionsContent2);
      zip.file("bootstrap.js", bootstrapJs);
      zip.file("bootstrap.css", bootstrapCss);
      zip.generateAsync({ type: 'blob' }).then(function (content) {
          FileSaver.saveAs(content, 'download.zip');
      });
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.generateCode}>Konvertuoti</button>
        </header>
        <BlocklyComponent
          ref={this.simpleWorkspace}
          readOnly={false}
          trashcan={true}
          media={"media/"}
          move={{
            scrollbars: true,
            drag: true,
            wheel: true
          }}
        >
        </BlocklyComponent>
      </div>
    );
  }
}

export default App;
