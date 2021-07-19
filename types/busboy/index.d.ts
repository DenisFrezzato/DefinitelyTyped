// Type definitions for busboy v0.2.13
// Project: https://www.npmjs.com/package/busboy
// Definitions by: Jacob Baskin <https://github.com/jacobbaskin>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
/// <reference types="node" />

import { IncomingHttpHeaders } from 'http';

declare namespace busboy {
    export interface Options {
        headers: IncomingHttpHeaders;
    }

    export interface BusboyConfig {
        headers?: IncomingHttpHeaders;
        highWaterMark?: number | undefined;
        fileHwm?: number | undefined;
        defCharset?: string | undefined;
        preservePath?: boolean | undefined;
        limits?:
            | {
                  fieldNameSize?: number | undefined;
                  fieldSize?: number | undefined;
                  fields?: number | undefined;
                  fileSize?: number | undefined;
                  files?: number | undefined;
                  parts?: number | undefined;
                  headerPairs?: number | undefined;
              }
            | undefined;
    }

    export interface FieldListener {
        (
            fieldname: string,
            val: string,
            fieldnameTruncated: boolean,
            valTruncated: boolean,
            encoding: string,
            mimetype: string,
        ): void;
    }

    export interface FileListener {
        (fieldname: string, file: NodeJS.ReadableStream, filename: string, encoding: string, mimetype: string): void;
    }

    export interface Busboy extends NodeJS.WritableStream {
        on(event: 'field', listener: FieldListener): this;
        on(event: 'file', listener: FileListener): this;
        on(event: 'finish', callback: () => void): this;
        on(event: 'partsLimit', callback: () => void): this;
        on(event: 'filesLimit', callback: () => void): this;
        on(event: 'fieldsLimit', callback: () => void): this;
        on(event: string, listener: (...args: any[]) => void): this;
    }

    interface BusboyConstructor {
        new (options: BusboyConfig): Busboy;
    }
}

declare module 'busboy' {
    const temp: busboy.BusboyConstructor;
    export = temp;
}
