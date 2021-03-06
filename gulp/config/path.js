import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist';
const srcFolder = './src';

const path = {
    build: {
        js: `${buildFolder}/js/`,
        html: `${buildFolder}/`,
        files: `${buildFolder}/files/`,
        css: `${buildFolder}/css/`,
        fonts: `${buildFolder}/fonts/`,
        images: `${buildFolder}/img/`,
    },
    src: {
        js: `${srcFolder}/js/app.js`,
        html: `${srcFolder}/*.html`,
        files: `${srcFolder}/files/**/*.*`,
        fonts: `${srcFolder}/fonts/**/*.ttf`,
        less: `${srcFolder}/less/style.less`,
        lessLibs: [],
        fontsCss: `${srcFolder}/less/fonts.less`,
        raster: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,svg,ico}`,
        toWebp: `${srcFolder}/img/**/*.{jpg,jpeg,png}`,
        svg: `${srcFolder}/img/**/*.svg`,
    },
    watch: {
        js: `${srcFolder}/js/**/*.js`,
        html: `${srcFolder}/**/*.html`,
        files: `${srcFolder}/files/**/*.*`,
        less: `${srcFolder}/less/**/*.less`,
        raster: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,svg,ico}`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: ``,
}

export default path;