import fs, { appendFile } from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
    // Search .otf fonts
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
        // Error notificator
        .pipe(app.plugins.plumber( 
            app.plugins.notify.onError({
                title: "FONTS otfToTtf",
                message: "Error: <%= error.message %>"
            })
        ))
        // Convert into .ttf
        .pipe(fonter({
            formats: ['ttf']
        }))
        // Upload into source folder
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
} 

export const ttfToWoff = () => {
    // Search .ttf fonts
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
        // Error notificator
        .pipe(app.plugins.plumber( 
            app.plugins.notify.onError({
                title: "FONTS ttfToWoff",
                message: "Error: <%= error.message %>"
            })
        ))
        // Convert into .woff
        .pipe(fonter({
            formats: ['woff']
        }))
        // Upload into build folder
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        // Search .ttf fonts
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {}))
        // Convert into .woff2
        .pipe(ttf2woff2())
        // Upload into build folder
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
}

export const fontsStyle = () => {
    let fontsFile = `${app.path.src.fontsCss}`;
    // Check if fonts exist
    fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
        if (fontsFiles) {
            // Check if fonts css exist
            if (!fs.existsSync(fontsFiles)) {
                //If there are no file, create it
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (var i = 0; i < fontsFiles.length; i++) {
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        if (fontWeight.toLowerCase() === 'thin') {
                            fontWeight = 100;
                        } else if (fontWeight.toLowerCase() === 'extralight' || fontWeight.toLowerCase() === 'ultralight') {
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === 'light') {
                            fontWeight = 300;
                        } else if (fontWeight.toLowerCase() === 'normal' || fontWeight.toLowerCase() === 'regular') {
                            fontWeight = 400;
                        } else if (fontWeight.toLowerCase() === 'medium') {
                            fontWeight = 500;
                        } else if (fontWeight.toLowerCase() === 'semibold' || fontWeight.toLowerCase() === 'demibold') {
                            fontWeight = 600;
                        } else if (fontWeight.toLowerCase() === 'bold') {
                            fontWeight = 700;
                        } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'ultrabold') {
                            fontWeight = 800;
                        } else if (fontWeight.toLowerCase() === 'black' || fontWeight.toLowerCase() === 'heavy') {
                            fontWeight = 900;
                        } else if (fontWeight.toLowerCase() === 'extrablack' || fontWeight.toLowerCase() === 'ultrablack') {
                            fontWeight = 950;
                        } else {
                            fontWeight = 400;
                        }
                        fs.appendFile(fontsFile,
                            `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("..\fonts\${fontFileName}.woff") format("woff"), url("..\fonts\${fontFileName}.woff2") format("woff2");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal\n}`
                        , cb);
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                // If file exist
                console.log("File less/fonts.less alredy exist. For update file delete him.")
            }
        }
    });

    return app.gulp.src(`${app.path.srcFolder}`);
    function cb() {}
} 