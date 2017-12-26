import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

const DEDICATED_WORKER = {
    input: './src/app/worker-services/dedicated-worker-gateway.ts',
    output: {
        // file: './dist/dworker.js',
        file : './src/assets/workers/dworker.js',
        format: "umd",
        sourcemap: "inline"
    }
};
const SHARED_WORKER = {
    input: './src/app/worker-services/shared-worker-gateway.ts',
    output: {
        // file: './dist/sworker.js',
        file : './src/assets/workers/sworker.js',
        format: "umd",
        sourcemap: "inline"
    }
};

const COMMON = {
    treeshake: true,
    plugins: [
        typescript({
            "typescript": require('typescript')
        }),
        commonjs(),
        resolve({
            jsnext: true,
            main: true,
            extensions: ['.js', '.json']
        }),
        // uglify()
    ]
};

export default [
    Object.assign({},DEDICATED_WORKER, COMMON),
    Object.assign({},SHARED_WORKER, COMMON)
];
