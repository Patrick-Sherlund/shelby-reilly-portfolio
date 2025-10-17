import * as L from "leaflet";

declare module "leaflet" {
    export class Pattern extends L.Class {
        constructor(options?: any);

        addTo(map: L.Map): this;

        remove(): this;

        setStyle(style: any): this;
    }

    export class StripePattern extends Pattern {
        constructor(options?: {
            weight?: number;
            spaceWeight?: number;
            color?: string;
            spaceColor?: string;
            opacity?: number;
            spaceOpacity?: number;
            angle?: number;
        });
    }

    export function stripePattern(options?: {
        weight?: number;
        spaceWeight?: number;
        color?: string;
        spaceColor?: string;
        opacity?: number;
        spaceOpacity?: number;
        angle?: number;
    }): StripePattern;
}
