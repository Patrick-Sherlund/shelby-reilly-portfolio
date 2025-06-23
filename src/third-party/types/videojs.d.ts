declare function videojs(
    id: string | Element,
    options?: videojs.PlayerOptions,
    ready?: videojs.ReadyCallback,
): videojs.Player;

export default videojs;
export as namespace videojs;

declare namespace videojs {
    interface ReadyCallback {
        (this: Player): void;
    }


    function addLanguage(code: string, data: LanguageTranslations): LanguageTranslations;


    function bind<F extends () => any>(context: any, fn: F, uid?: number): F;


    function createTimeRanges(start?: number | TimeRange[], end?: number): TimeRange;


    const browser: Browser;

    const dom: Dom;


    function formatTime(seconds: number, guide: number): string;


    function getAllPlayers(): Player[];


    const getComponent: typeof Component.getComponent;


    function getPlayer(id: string | Element): Player | undefined;


    function getPlayers(): { [key: string]: Player };


    const getPlugin: typeof Plugin.getPlugin;


    const getPlugins: typeof Plugin.getPlugins;


    const getPluginVersion: typeof Plugin.getPluginVersion;


    const getTech: typeof Tech.getTech;


    function hook(type: "setup", fn: Hook.Setup | Hook.Setup[]): void;

    function hook(type: "beforesetup", fn: Hook.BeforeSetup | Hook.BeforeSetup[]): void;


    function hookOnce(type: string, fn?: (() => any) | Array<() => any>): void;


    function hooks(type: string, fn?: (() => any) | Array<() => any>): Array<() => any>;


    function isCrossOrigin(url: string): boolean;


    const hooks_: { [type: string]: () => any };


    const log: Log;


    function mergeOptions<A, B, C, D, E, F>(
        option: A,
        option2?: B,
        option3?: C,
        option4?: D,
        option5?: E,
        option6?: F,
    ): A & B & C & D & E & F;


    function parseUrl(url: string): url.URLObject;


    const middleware: { TERMINATOR: {} };


    function off(elem: Element, type: string | string, fn: EventTarget.EventListener): void;


    function on(elem: Element, type: string | string[], fn: EventTarget.EventListener): void;


    function one(elem: Element, type: string | string[], fn: EventTarget.EventListener): void;


    const options: PlayerOptions;


    const plugin: typeof Plugin.registerPlugin;


    const registerComponent: typeof Component.registerComponent;


    const registerPlugin: typeof Plugin.registerPlugin;


    const registerTech: typeof Tech.registerTech;


    function resetFormatTime(): void;


    function setFormatTime(customImplementation: (seconds: number, guide: number) => string): void;


    function removeHook(type: string, fn: () => any): boolean;


    function trigger(elem: Element, event: EventTarget.Event | string, hash?: any): boolean | undefined;


    const TOUCH_ENABLED: boolean;


    function use(type: string, middleware: (player: Player) => Middleware): void;


    function extend<
        TSuper extends new(...args: any[]) => any,
        TSubClassMethods extends Record<string | symbol, (this: InstanceType<TSuper>, ...args: any[]) => any>,
    >(
        superClass: TSuper,
        subClassMethods?: TSubClassMethods,
    ): new(...args: ConstructorParameters<TSuper>) => InstanceType<TSuper> & TSubClassMethods;


    const VERSION: string;


    const xhr: XhrObject;

    namespace Hook {
        type BeforeSetup = (element: HTMLVideoElement, options: any) => any;

        type Setup = (player: Player) => void;
    }


    const AudioTrack: {
        prototype: Track;

        /**
         * Create an instance of this class.
         *
         * @param [options={}]
         *        Object of option names and values
         *
         * @param [options.kind='']
         *        A valid audio track kind
         *
         * @param [options.id='vjs_track_' + Guid.newGUID()]
         *        A unique id for this AudioTrack.
         *
         * @param [options.label='']
         *        The menu label for this track.
         *
         * @param [options.language='']
         *        A valid two character language code.
         *
         * @param [options.enabled]
         *        If this track is the one that is currently playing. If this track is part of
         *        an {@link AudioTrackList}, only one {@link AudioTrack} will be enabled.
         */
        new(options?: AudioTrackOptions): Track;
    };

    /**
     * Object of option names and values
     *
     * @param [options.kind='']
     *        A valid audio track kind
     *
     * @param [options.id='vjs_track_' + Guid.newGUID()]
     *        A unique id for this AudioTrack.
     *
     * @param [options.label='']
     *        The menu label for this track.
     *
     * @param [options.language='']
     *        A valid two character language code.
     *
     * @param [options.enabled]
     *        If this track is the one that is currently playing. If this track is part of
     *        an {@link AudioTrackList}, only one {@link AudioTrack} will be enabled.
     */
    interface AudioTrackOptions {
        kind?: AudioTrack.Kind | undefined;
        id?: string | undefined;
        label?: string | undefined;
        language?: string | undefined;
        enabled?: boolean | undefined;
    }

    namespace AudioTrack {

        type Kind = "alternative" | "descriptions" | "main" | "main-desc" | "translation" | "commentary";
    }


    interface AudioTrackButton extends MenuButton {

        buildCSSClass(): string;


        buildWrapperCSSClass(): string;


        createItems(items?: AudioTrackMenuItem[]): AudioTrackMenuItem[];
    }

    const AudioTrackButton: {
        prototype: AudioTrackButton;


        new(player: Player, options?: TrackButtonOptions): AudioTrackButton;
    };


    interface AudioTrackMenuItem extends MenuItem {

        handleTracksChange(event: EventTarget.Event): void;
    }

    const AudioTrackMenuItem: {
        prototype: AudioTrackMenuItem;


        new(player: Player, options?: AudioTrackMenuItemOptions): AudioTrackMenuItem;
    };

    interface VideojsAudioTrack extends Track {
        enabled: boolean;
        readonly id: string;
        kind: string;
        readonly label: string;
        language: string;
        readonly sourceBuffer: SourceBuffer | null;
    }


    interface AudioTrackList extends TrackList {
        [index: number]: VideojsAudioTrack;


        addTrack(track: VideojsAudioTrack): void;
    }

    interface AudioTrackMenuItemOptions extends MenuItemOptions {
        track?: VideojsAudioTrack | undefined;
    }


    interface BigPlayButton extends Button {

        buildCSSClass(): string;


        handleClick(event: EventTarget.Event): void;


        handleKeyPress(event: EventTarget.Event): void;


        handleMouseDown(event: EventTarget.Event): void;
    }

    const BigPlayButton: {
        prototype: BigPlayButton;


        new(player: Player, options?: ComponentOptions): BigPlayButton;
    };

    interface Browser {
        ANDROID_VERSION: number | null;
        CHROME_VERSION: number;
        IS_ANDROID: boolean;
        IS_ANY_SAFARI: boolean;
        IS_CHROME: boolean;
        IS_EDGE: boolean;
        IS_NATIVE_ANDROID: boolean;
        IS_IPAD: boolean;
        IS_IPHONE: boolean;
        IS_IPOD: boolean;
        IS_IOS: boolean;
        IS_SAFARI: boolean;
        IE_VERSION: number;
        IOS_VERSION: number | null;
        TOUCH_ENABLED: boolean;
    }


    interface Button extends ClickableComponent {
        options_: ComponentOptions;


        createEl(tag: string, props?: any, attributes?: any): HTMLButtonElement;


        addChild(component: string, optionsopt?: any, indexopt?: number): Component;

        addChild(component: Element, optionsopt?: any, indexopt?: number): Element;

        addChild<T extends Component>(child: string | T, options?: any): T;


        enable(): void;


        disable(): void;


        handleKeyPress(event: EventTarget.Event): void;
    }

    const Button: {
        prototype: Button;


        new(player: Player, options?: ComponentOptions): Button;
    };


    interface CaptionsButton extends TextTrackButton {

        buildCSSClass(): string;


        buildWrapperCSSClass(): string;


        createItems(): CaptionSettingsMenuItem[];
    }

    const CaptionsButton: {
        prototype: CaptionsButton;


        new(player: Player, options?: TrackButtonOptions, ready?: Component.ReadyCallback): CaptionsButton;
    };


    interface CaptionSettingsMenuItem extends TextTrackMenuItem {

        handleClick(event: EventTarget.Event): void;
    }

    const CaptionsSettingsMenuItem: {
        prototype: CaptionSettingsMenuItem;


        new(player: Player, options?: CaptionSettingsMenuItemOptions): CaptionSettingsMenuItem;
    };

    interface CaptionSettingsMenuItemOptions extends TextTrackMenuItemOptions {
        kind: TextTrack.Kind;
    }


    interface ChaptersButton extends TextTrackButton {

        buildCSSClass(): string;


        buildWrapperCSSClass(): string;


        createItems(): TextTrackMenuItem[];


        createMenu(): Menu;


        findChaptersTrack(): TextTrack | undefined;


        getMenuCaption(): string;


        setTrack(track: TextTrack): void;


        update(event?: EventTarget.Event): void;
    }

    const ChaptersButton: {
        prototype: ChaptersButton;


        new(player: Player, options?: TrackButtonOptions, ready?: Component.ReadyCallback): ChaptersButton;
    };


    interface ChaptersTrackMenuItem extends MenuItem {
        track: TextTrack;

        cue: TextTrackCueList.TextTrackCue;


        handleClick(event: EventTarget.Event): void;


        update(event: EventTarget.Event): void;
    }

    const ChaptersTrackMenuItem: {
        prototype: ChaptersTrackMenuItem;


        new(player: Player, options?: ChaptersTrackMenuItemOptions): ChaptersTrackMenuItem;
    };

    interface ChaptersTrackMenuItemOptions extends MenuItemOptions {
        track: TextTrack;
        cue: TextTrackCueList.TextTrackCue;
    }

    type Child =
        | string
        | {
        name: string;
        children?: Child[] | undefined;
    };

    interface ClickableComponentOptions extends ComponentOptions {
        clickHandler?: () => void;
    }


    interface ClickableComponent extends Component {
        options_: ClickableComponentOptions;


        buildCSSClass(): string;


        createEl(tag: string, props?: any, attributes?: any): Element;


        controlText(): string;


        controlText(text: string, el?: Element): void;


        createControlTextEl(el?: Element): Element;


        disable(): void;


        enable(): void;

        /**
         * This gets called when a `ClickableComponent` gets:
         * - Clicked (via the `click` event, listening starts in the constructor)
         * - Tapped (via the `tap` event, listening starts in the constructor)
         * - The following things happen in order:
         *   1. {@link ClickableComponent#handleFocus} is called via a `focus` event on the
         *      `ClickableComponent`.
         *   2. {@link ClickableComponent#handleFocus} adds a listener for `keydown` on using
         *      {@link ClickableComponent#handleKeyPress}.
         *   3. `ClickableComponent` has not had a `blur` event (`blur` means that focus was lost). The user presses
         *      the space or enter key.
         *   4. {@link ClickableComponent#handleKeyPress} calls this function with the `keydown`
         *      event as a parameter.
         *
         * @param event
         *        The `keydown`, `tap`, or `click` event that caused this function to be
         *        called.
         *
         * @listens tap
         * @listens click
         */
        handleClick(event: EventTarget.Event): void;


        handleFocus(event: EventTarget.Event): void;


        handleKeyPress(event: EventTarget.Event): void;


        handleBlur(event: EventTarget.Event): void;
    }

    const ClickableComponent: {
        prototype: ClickableComponent;


        new(player: Player, options?: ClickableComponentOptions): ClickableComponent;
    };


    interface CloseButton extends Button {
        options_: CloseButtonOptions;


        buildCSSClass(): string;


        handleClick(event: EventTarget.Event): void;
    }

    const CloseButton: {
        prototype: CloseButton;


        new(player: Player, options?: CloseButtonOptions): CloseButton;
    };

    interface CloseButtonOptions extends ComponentOptions {
        controlText?: string | undefined;
    }


    interface Component extends EventedMixin {
        options_: ComponentOptions;

        player_: Player;

        children_: Component[];


        $(selector: string, context?: string | Element): Element;


        $$(selector: string, context?: string | Element): NodeList;


        addChild(component: string, optionsopt?: any, indexopt?: number): Component;

        addChild(component: Element, optionsopt?: any, indexopt?: number): Element;

        addChild<T extends Component>(child: string | T, options?: any, index?: number): T;


        addClass(classToAdd: string): void;


        blur(): void;


        buildCSSClass(): string;


        cancelAnimationFrame(id: number): number;


        cancelNamedAnimationFrame(name: string): void;


        children(): Component[];


        clearInterval(intervalId: number): number;


        clearTimeout(timeoutId: number): number;


        contentEl(): Element;

        controlText(key: string): string;


        createEl(tagName?: string, properties?: any, attributes?: any): Element;


        currentDimension(widthOrHeight: "width" | "height"): number;


        currentDimensions(): Component.DimensionObject;


        currentHeight(): number;


        currentWidth(): number;

        /**
         * Get or set width or height of the `Component` element. This is the shared code
         * for the {@link Component#width} and {@link Component#height}.
         *
         * Things to know:
         * - If the width or height in an number this will return the number postfixed with 'px'.
         * - If the width/height is a percent this will return the percent postfixed with '%'
         * - Hidden elements have a width of 0 with `window.getComputedStyle`. This function
         *   defaults to the `Component`s `style.width` and falls back to `window.getComputedStyle`.
         *   See [this]{@link http://www.foliotek.com/devblog/getting-the-width-of-a-hidden-element-with-jquery-using-width/}
         *   for more information
         * - If you want the computed style of the component, use {@link Component#currentWidth}
         *   and {@link {Component#currentHeight}
         *
         * @fires Component#componentresize
         *
         * @param widthOrHeight
         *        'width' or 'height'
         *
         * @param [num]
         *         New dimension
         *
         * @param [skipListeners]
         *         Skip componentresize event trigger
         *
         * @return The dimension when getting or 0 if unset
         */
        dimension(widthOrHeight: "width" | "height", num: string | number, skipListeners?: boolean): void;

        dimension(widthOrHeight: "width" | "height"): number;


        dimensions(width: string | number, height: string | number): void;


        dispose(): void;


        isDisposed(): boolean;


        el(): Element;


        emitTapEvents(): void;

        /**
         * This function reports user activity whenever touch events happen. This can get
         * turned off by any sub-components that wants touch events to act another way.
         *
         * Report user touch activity when touch events occur. User activity gets used to
         * determine when controls should show/hide. It is simple when it comes to mouse
         * events, because any mouse event should show the controls. So we capture mouse
         * events that bubble up to the player and report activity when that happens.
         * With touch events it isn't as easy as `touchstart` and `touchend` toggle player
         * controls. So touch events can't help us at the player level either.
         *
         * User activity gets checked asynchronously. So what could happen is a tap event
         * on the video turns the controls off. Then the `touchend` event bubbles up to
         * the player. Which, if it reported user activity, would turn the controls right
         * back on. We also don't want to completely block touch events from bubbling up.
         * Furthermore a `touchmove` event and anything other than a tap, should not turn
         * controls back on.
         *
         * @listens Component#touchstart
         * @listens Component#touchmove
         * @listens Component#touchend
         * @listens Component#touchcancel
         */
        enableTouchActivity(): void;


        focus(): void;


        getAttribute(attribute: string): string | null;


        getChild<TComponentName extends keyof ComponentNameMap>(
            name: TComponentName,
        ): ComponentNameMap[TComponentName] | undefined;


        getChild(name: string): Component | undefined;


        getDescendant(...names: Array<string | string[]>): Component | undefined;


        getChildById(id: string): Component | undefined;


        hasClass(classToCheck: string): boolean;


        height(num: number | string, skipListeners?: boolean): void;

        height(): number | string;


        hide(): void;


        id(): string;


        initChildren(): void;

        /**
         * Localize a string given the string in english.
         *
         * If tokens are provided, it'll try and run a simple token replacement on the provided string.
         * The tokens it looks for look like `{1}` with the index being 1-indexed into the tokens array.
         *
         * If a `defaultValue` is provided, it'll use that over `string`,
         * if a value isn't found in provided language files.
         * This is useful if you want to have a descriptive key for token replacement
         * but have a succinct localized string and not require `en.json` to be included.
         *
         * Currently, it is used for the progress bar timing.
         * ```js
         * {
         *   "progress bar timing: currentTime={1} duration={2}": "{1} of {2}"
         * }
         * ```
         * It is then used like so:
         * ```js
         * this.localize('progress bar timing: currentTime={1} duration{2}',
         *               [this.player_.currentTime(), this.player_.duration()],
         *               '{1} of {2}');
         * ```
         *
         * Which outputs something like: `01:23 of 24:56`.
         *
         * @param string
         *        The string to localize and the key to lookup in the language files.
         * @param [tokens]
         *        If the current item has token replacements, provide the tokens here.
         * @param [defaultValue]
         *        Defaults to `string`. Can be a default value to use for token replacement
         *        if the lookup key is needed to be separate.
         *
         * @return The localized string or if no localization exists the english string.
         */
        localize(string: string, tokens?: string[], defaultValue?: string): string;


        lockShowing(): void;


        name(): string;


        options(obj: any): any;


        player(): Player;


        ready(callback: ReadyCallback): this;


        removeAttribute(attribute: string): void;


        removeChild(component: Component): void;


        removeClass(classToRemove: string): void;

        /**
         * Queues up a callback to be passed to requestAnimationFrame (rAF), but
         * with a few extra bonuses:
         *
         * - Supports browsers that do not support rAF by falling back to
         *   {@link Component#setTimeout}.
         *
         * - The callback is turned into a {@link Component~GenericCallback} (i.e.
         *   bound to the component).
         *
         * - Automatic cancellation of the rAF callback is handled if the component
         *   is disposed before it is called.
         *
         * @param fn
         *         A function that will be bound to this component and executed just
         *         before the browser's next repaint.
         *
         * @return Returns an rAF ID that gets used to identify the timeout. It can
         *         also be used in {@link Component#cancelAnimationFrame} to cancel
         *         the animation frame callback.
         *
         * @listens Component#dispose
         * @see [Similar to]{@link https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame}
         */
        requestAnimationFrame(fn: Component.GenericCallback): number;


        requestNamedAnimationFrame(name: string, fn: Component.GenericCallback): string | undefined;


        setAttribute(attribute: string, value: string): void;

        /**
         * Creates a function that gets run every `x` milliseconds. This function is a wrapper
         * around `window.setInterval`. There are a few reasons to use this one instead though.
         * 1. It gets cleared via  {@link Component#clearInterval} when
         *    {@link Component#dispose} gets called.
         * 2. The function callback will be a {@link Component~GenericCallback}
         *
         * @param fn
         *        The function to run every `x` seconds.
         *
         * @param interval
         *        Execute the specified function every `x` milliseconds.
         *
         * @return Returns an id that can be used to identify the interval. It can also be be used in
         *         {@link Component#clearInterval} to clear the interval.
         *
         * @listens Component#dispose
         * @see [Similar to]{@link https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval}
         */
        setInterval(fn: Component.GenericCallback, interval: number): number;

        /**
         * Creates a function that runs after an `x` millisecond timeout. This function is a
         * wrapper around `window.setTimeout`. There are a few reasons to use this one
         * instead though:
         * 1. It gets cleared via  {@link Component#clearTimeout} when
         *    {@link Component#dispose} gets called.
         * 2. The function callback will gets turned into a {@link Component~GenericCallback}
         *
         * > Note: You can't use `window.clearTimeout` on the id returned by this function. This
         *         will cause its dispose listener not to get cleaned up! Please use
         *         {@link Component#clearTimeout} or {@link Component#dispose} instead.
         *
         * @param fn
         *        The function that will be run after `timeout`.
         *
         * @param timeout
         *        Timeout in milliseconds to delay before executing the specified function.
         *
         * @return Returns a timeout ID that gets used to identify the timeout. It can also
         *         get used in {@link Component#clearTimeout} to clear the timeout that
         *         was set.
         *
         * @listens Component#dispose
         * @see [Similar to]{@link https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout}
         */
        setTimeout(fn: Component.GenericCallback, timeout: number): number;


        show(): void;


        toggleClass(classToToggle: string, predicate?: boolean | Dom.Predicate): void;


        triggerReady(): void;


        unlockShowing(): void;


        width(num: string | number, skipListeners?: number): void;

        width(): string | number;
    }

    const Component: {
        prototype: Component;


        new(player: Player, options?: ComponentOptions, ready?: Component.ReadyCallback): Component;


        getComponent(name: "Button" | "button"): typeof Button;
        getComponent(name: "ClickableComponent" | "clickablecomponent"): typeof ClickableComponent;
        getComponent(name: "ModalDialog" | "modaldialog"): typeof ModalDialog;
        getComponent(name: "Menu" | "menu"): typeof Menu;
        getComponent(name: "MenuButton" | "menubutton"): typeof MenuButton;
        getComponent(name: "MenuItem" | "menuitem"): typeof MenuItem;
        getComponent(name: "MouseTimeDisplay" | "mouseTimeDisplay"): typeof MouseTimeDisplay;
        getComponent(name: "Spacer" | "spacer"): typeof Spacer;
        getComponent(name: "Player" | "player"): typeof Player;
        getComponent(name: "timeTooltip" | "TimeTooltip"): typeof TimeToolTip;
        getComponent(name: "Component" | "component" | string): typeof Component;


        registerComponent(name: string, ComponentToRegister: any): any;
    };

    interface ComponentNameMap {
        liveDisplay: LiveDisplay;
        playbackRateMenuButton: PlaybackRateMenuButton;
        progressControl: ProgressControl;
        remainingTimeDisplay: RemainingTimeDisplay;
    }

    interface ComponentOptions {
        children?: Child[] | undefined;
        createEl?: boolean | undefined;
        el?: HTMLElement | undefined;
        id?: string | undefined;
    }

    namespace Component {

        type ReadyCallback = (this: Component) => void;


        type GenericCallback = (this: Component) => void;


        interface DimensionObject {
            width: number;
            height: number;
        }
    }

    type Content = string | Element | Node | (() => string | Element | Node);


    interface ControlBar extends Component {
        options_: ControlBarOptions;


        createEl(): HTMLDivElement;
    }

    const ControlBar: {
        prototype: ControlBar;


        new(player: Player, options?: ControlBarOptions): ControlBar;
    };

    interface ControlBarOptions extends ComponentOptions {
        volumePanel?: VolumePanelOptions | boolean | undefined;
        playToggle?: boolean | undefined;
        captionsButton?: boolean | undefined;
        chaptersButton?: boolean | undefined;
        subtitlesButton?: boolean | undefined;
        remainingTimeDisplay?: boolean | undefined;
        progressControl?: ProgressControlOptions | boolean | undefined;
        fullscreenToggle?: boolean | undefined;
        playbackRateMenuButton?: boolean | undefined;
        pictureInPictureToggle?: boolean | undefined;
        currentTimeDisplay?: boolean | undefined;
        timeDivider?: boolean | undefined;
        durationDisplay?: boolean | undefined;
        liveDisplay?: boolean | undefined;
        seekToLive?: boolean | undefined;
        customControlSpacer?: boolean | undefined;
        descriptionsButton?: boolean | undefined;
        subsCapsButton?: boolean | undefined;
        audioTrackButton?: boolean | undefined;
    }


    interface CurrentTimeDisplay extends TimeDisplay {

        buildCSSClass(): string;


        updateContent(event: EventTarget.Event): void;


        handleEnded(event: EventTarget.Event): void;
    }

    const CurrentTimeDisplay: {
        prototype: CurrentTimeDisplay;


        new(player: Player, options: ComponentOptions): CurrentTimeDisplay;
    };


    interface CustomControlSpacer extends Spacer {

        buildCSSClass(): string;


        createEl(): HTMLDivElement;
    }

    const CustomControlSpacer: {
        prototype: CustomControlSpacer;


        new(player: Player, options?: ComponentOptions, ready?: Component.ReadyCallback): CustomControlSpacer;
    };


    interface DescriptionsButton extends TextTrackButton {

        handleTracksChange(event: EventTarget.Event): void;


        buildCSSClass(): string;


        buildWrapperCSSClass(): string;
    }

    const DescriptionsButton: {
        prototype: DescriptionsButton;


        new(player: Player, options?: TrackButtonOptions, ready?: Component.ReadyCallback): DescriptionsButton;
    };


    interface DurationDisplay extends TimeDisplay {

        buildCSSClass(): string;


        updateContent(event: EventTarget.Event): void;
    }

    const DurationDisplay: {
        prototype: DurationDisplay;


        new(player: Player, options: ComponentOptions): DurationDisplay;
    };


    interface ErrorDisplay extends ModalDialog {

        buildCSSClass(): string;


        content(): string;
    }

    const ErrorDisplay: {
        prototype: ErrorDisplay;


        new(player: Player, options?: ModalDialogOptions): ErrorDisplay;
    };

    interface Dom {

        $(selector: string, context?: string | Element): Element;


        $$(selector: string, context?: string | Element): NodeList;


        addClass(element: Element, classToAdd: string): Element;


        appendContent(el: Element, content: Content | Content[]): Element;


        blockTextSelection(): void;


        createEl(tagName: "canvas", properties?: any, attributes?: any, content?: any): HTMLCanvasElement;

        createEl(tagName: "form", properties?: any, attributes?: any, content?: any): HTMLFormElement;

        createEl(tagName: "img", properties?: any, attributes?: any, content?: any): HTMLImageElement;

        createEl(tagName: "input", properties?: any, attributes?: any, content?: any): HTMLInputElement;

        createEl(tagName: "option", properties?: any, attributes?: any, content?: any): HTMLOptionElement;

        createEl(tagName: "select", properties?: any, attributes?: any, content?: any): HTMLSelectElement;

        createEl(tagName: "textarea", properties?: any, attributes?: any, content?: any): HTMLTextAreaElement;

        createEl(tagName?: string, properties?: any, attributes?: any, content?: any): Element;


        emptyEl(el: Element): Element;


        findPosition(el: Element): Dom.Position;


        getAttribute(el: Element, attribute: string): string;


        getAttributes(tag: Element): any;


        getBoundingClientRect(el: Element): ClientRect;


        getPointerPosition(el: Element, event: Event): Dom.Coordinates;


        hasClass(element: Element, classToCheck: string): boolean;


        insertContent(el: Element, content: string | Element | (() => any)): Element;


        isEl(value: any): boolean;


        isInFrame(): boolean;


        isReal(): boolean;


        isSingleLeftClick(event: EventTarget.Event): boolean;


        isTextNode(value: any): boolean;

        /**
         * Normalizes content for eventual insertion into the DOM.
         *
         * This allows a wide range of content definition methods, but protects
         * from falling into the trap of simply writing to `innerHTML`, which is
         * an XSS concern.
         *
         * The content for an element can be passed in multiple types and
         * combinations, whose behavior is as follows:
         *
         * @param content
         *        - String: Normalized into a text node.
         *        - Element/TextNode: Passed through.
         *        - Array: A one-dimensional array of strings, elements, nodes, or functions
         *          (which return single strings, elements, or nodes).
         *        - Function: If the sole argument, is expected to produce a string, element,
         *          node, or array as defined above.
         *
         * @return All of the content that was passed in normalized.
         */
        normalizeContent(content: Content | Content[]): Content[];


        prependTo(child: Element, parent: Element): void;


        removeAttribute(el: Element, attribute: string): void;


        removeClass(element: Element, classToRemove: string): Element;


        setAttribute(el: Element, attribute: string, value: string): void;


        setAttributes(el: Element, attributes: any): void;


        textContent(el: Element, text: string): Element;


        toggleClass(element: Element, classToToggle: string, predicate: Dom.Predicate): Element;


        unblockTextSelection(): void;
    }

    namespace Dom {

        interface Coordinates {

            x: number;

            y: number;
        }


        type Predicate = (element: Element, classToToggle: string) => boolean;


        interface Position {

            top: number;

            left: number;
        }
    }


    interface EventedMixin {
        /**
         * Removes listener(s) from event(s) on an evented object.
         *
         * @param [targetOrType]
         *         If this is a string or array, it represents the event type(s).
         *
         *         Another evented object can be passed here instead, in which case
         *         ALL 3 arguments are _required_.
         *
         * @param [typeOrListener]
         *         If the first argument was a string or array, this may be the
         *         listener function. Otherwise, this is a string or array of event
         *         type(s).
         *
         * @param [listener]
         *         If the first argument was another evented object, this will be
         *         the listener function; otherwise, _all_ listeners bound to the
         *         event type(s) will be removed.
         */
        off(target?: Component | Element, type?: string | string[], listener?: (...args: any[]) => void): void;

        off(type?: string | string[], listener?: (...args: any[]) => void): void;

        /**
         * Add a listener to an event (or events) on this object or another evented
         * object.
         *
         * @param targetOrType
         *         If this is a string or array, it represents the event type(s)
         *         that will trigger the listener.
         *
         *         Another evented object can be passed here instead, which will
         *         cause the listener to listen for events on _that_ object.
         *
         *         In either case, the listener's `this` value will be bound to
         *         this object.
         *
         * @param typeOrListener
         *         If the first argument was a string or array, this should be the
         *         listener function. Otherwise, this is a string or array of event
         *         type(s).
         *
         * @param [listener]
         *         If the first argument was another evented object, this will be
         *         the listener function.
         */
        on(target?: Component | Element, type?: string | string[], listener?: (...args: any[]) => void): void;

        on(type?: string | string[], listener?: (...args: any[]) => void): void;

        /**
         * Add a listener to an event (or events) on this object or another evented
         * object. The listener will only be called once and then removed.
         *
         * @param targetOrType
         *         If this is a string or array, it represents the event type(s)
         *         that will trigger the listener.
         *
         *         Another evented object can be passed here instead, which will
         *         cause the listener to listen for events on _that_ object.
         *
         *         In either case, the listener's `this` value will be bound to
         *         this object.
         *
         * @param typeOrListener
         *         If the first argument was a string or array, this should be the
         *         listener function. Otherwise, this is a string or array of event
         *         type(s).
         *
         * @param [listener]
         *         If the first argument was another evented object, this will be
         *         the listener function.
         */
        one(target?: Component | Element, type?: string | string[], listener?: (...args: any[]) => void): void;

        one(type?: string | string[], listener?: (...args: any[]) => void): void;


        trigger(event: any, hash?: any): boolean;
    }


    interface EventTarget {

        addEventListener(type: string | string[], fn: EventTarget.EventListener): void;


        dispatchEvent(event: string | Event): void;


        off(type: string | string[], fn: EventTarget.EventListener): void;


        on(type: string | string[], fn: EventTarget.EventListener): void;


        one(type: string | string[], fn: EventTarget.EventListener): void;


        removeEventListener(type: string | string[], fn: EventTarget.EventListener): void;


        trigger(event: string | EventTarget.Event): void;
    }

    const EventTarget: {
        prototype: EventTarget;

        new(): EventTarget;
    };

    namespace EventTarget {

        interface Event extends CustomEvent {
            [key: string]: any;
        }


        type EventListener = (e: Event, data?: any) => void;
    }


    interface FullscreenToggle extends Button {

        buildCSSClass(): string;


        handleFullscreenChange(event: EventTarget.Event): void;


        handleClick(event: EventTarget.Event): void;
    }

    const FullscreenToggle: {
        prototype: FullscreenToggle;


        new(player: Player, options?: ComponentOptions): FullscreenToggle;
    };


    interface HTMLTrackElementList {

        length: number;

        [index: number]: HTMLTrackElement;
    }

    const HTMLTrackElementList: {
        prototype: HTMLTrackElementList;


        new(tracks?: HTMLTrackElement[]): HTMLTrackElementList;
    };

    interface KeyboardEvent extends EventTarget.Event {
        readonly which: number;
    }

    interface LanguageTranslations {
        [language: string]: string;
    }

    interface LiveDisplay extends Component {
        el(): HTMLDivElement;
    }


    interface LiveTracker extends Component {

        startTracking(): void;


        stopTracking(): void;


        seekableEnd(): number;


        seekableStart(): number;


        liveWindow(): number;


        atLiveEdge(): boolean;


        behindLiveEdge(): boolean;


        nextSeekedFromUser(): void;


        liveCurrentTime(): number;


        pastSeekEnd(): number;


        isLive(): boolean;


        isTracking(): boolean;


        seekToLiveEdge(): void;
    }


    interface Log {

        createLogger: (label: string) => Log;
        history: {

            (): any[];


            clear(): void;


            disable(): void;


            enable(): void;
        };

        levels: {
            all: string;
            off: string;
            debug: string;
            info: string;
            warn: string;
            error: string;
            DEFAULT: string;
        };


        (...args: any[]): void;


        debug(...args: any[]): void;


        error(...args: any[]): void;


        level(lvl?: string): string;


        warn(...args: any[]): void;
    }


    interface MediaError {

        code: number;


        MEDIA_ERR_CUSTOM: 0;


        MEDIA_ERR_ABORTED: 1;


        MEDIA_ERR_NETWORK: 2;


        MEDIA_ERR_DECODE: 3;


        MEDIA_ERR_SRC_NOT_SUPPORTED: 4;


        MEDIA_ERR_ENCRYPTED: 5;


        message: string;


        status: any[];
    }

    const MediaError: {
        prototype: MediaError;


        new(value: number | string | { [key: string]: any } | MediaError): MediaError;


        defaultMessages: string[];


        readonly errorTypes: string[];


        MEDIA_ERR_CUSTOM: 0;


        MEDIA_ERR_ABORTED: 1;


        MEDIA_ERR_NETWORK: 2;


        MEDIA_ERR_DECODE: 3;


        MEDIA_ERR_SRC_NOT_SUPPORTED: 4;


        MEDIA_ERR_ENCRYPTED: 5;
    };


    interface Menu extends Component {
        options_: MenuOptions;

        menuButton_: MenuButton;


        addItem(component: string | MenuItem): void;


        createEl(): HTMLDivElement;

        dispose(): void;


        focus(item?: any): void;


        handleKeyPress(event: EventTarget.Event): void;


        stepBack(): void;


        stepForward(): void;
    }

    const Menu: {
        prototype: Menu;


        new(player: Player, options?: MenuOptions): Menu;
    };

    interface MenuOptions extends ComponentOptions {
        menuButton: MenuButton;
    }


    interface MenuButton extends Component {
        options_: MenuButtonOptions;

        menu: Menu;

        menuButton_: Button;


        blur(): void;


        buildCSSClass(): string;


        buildWrapperCSSClass(): string;


        controlText(text?: string, el?: Element): string;


        createEl(): Element;


        createItems(): MenuItem[];


        createMenu(): Menu;


        disable(): void;


        enable(): void;


        focus(): void;


        handleBlur(event: EventTarget.Event): void;


        handleClick(event: EventTarget.Event): void;


        handleFocus(event: EventTarget.Event): void;


        handleKeyPress(event: EventTarget.Event): void;


        handleSubmenuKeyPress(event: EventTarget.Event): void;


        pressButton(): void;


        unpressButton(): void;


        update(): void;
    }

    const MenuButton: {
        prototype: MenuButton;


        new(player: Player, options?: MenuButtonOptions): MenuButton;
    };

    interface MenuButtonOptions extends ComponentOptions {
        title?: string | undefined;
        iniChildren?: boolean | undefined;
    }


    interface MenuItem extends ClickableComponent {
        options_: MenuItemOptions;


        createEl(type: string, props?: any, attrs?: any): HTMLLIElement;


        handleClick(event: EventTarget.Event): void;


        selected(selected: boolean): void;
    }

    const MenuItem: {
        prototype: MenuItem;


        new(player: Player, options?: MenuItemOptions): MenuItem;
    };

    interface MenuItemOptions extends ComponentOptions {
        label?: string | undefined;
        multiSelectable?: boolean | undefined;
        selectable?: boolean | undefined;
        selected?: boolean | undefined;
    }

    interface Middleware {

        setSource: (src: Tech.SourceObject, next: (err: any, src: Tech.SourceObject) => void) => void;
    }


    interface ModalDialog extends Component {
        options_: ModalDialogOptions;

        closeable_: boolean;


        buildCSSClass(): string;


        close(): void;


        closeable(value: boolean): boolean;


        content(value?: Content): any;


        createEl(): HTMLDivElement;


        description(): string;

        dispose(): void;


        empty(): void;


        fill(): void;


        fillWith(content?: Content): void;


        handleKeyDown(): void;


        handleKeyPress(e: EventTarget.Event): void;


        label(): string;


        open(): void;


        opened(value?: boolean): boolean;
    }

    const ModalDialog: {
        prototype: ModalDialog;


        new(player: Player, options?: ModalDialogOptions): ModalDialog;
    };

    /**
     * Options for this class
     *
     * @param [content=undefined]
     *        Provide customized content for this modal.
     *
     * @param [description]
     *        A text description for the modal, primarily for accessibility.
     *
     * @param [fillAlways=false]
     *        Normally, modals are automatically filled only the first time
     *        they open. This tells the modal to refresh its content
     *        every time it opens.
     *
     * @param [label]
     *        A text label for the modal, primarily for accessibility.
     *
     * @param [pauseOnOpen=true]
     *        If `true`, playback will be paused if playing when
     *        the modal opens, and resumed when it closes.
     *
     * @param [temporary=true]
     *        If `true`, the modal can only be opened once; it will be
     *        disposed as soon as it's closed.
     *
     * @param [uncloseable=false]
     *        If `true`, the user will not be able to close the modal
     *        through the UI in the normal ways. Programmatic closing is
     *        still possible.
     */
    interface ModalDialogOptions extends ComponentOptions {
        content?: any;
        description?: string | undefined;
        fillAlways?: boolean | undefined;
        label?: string | undefined;
        pauseOnOpen?: boolean | undefined;
        temporary?: boolean | undefined;
        uncloseable?: boolean | undefined;
    }


    interface MouseTimeDisplay extends Component {

        createEl(): HTMLDivElement;


        update(seekBarRect: ClientRect, seekBarPoint: number): void;
    }

    const MouseTimeDisplay: {
        prototype: MouseTimeDisplay;


        new(player: Player, options?: ComponentOptions): MouseTimeDisplay;
    };

    enum ReadyState {
        HaveNothing = 0,
        HaveMetadata = 1,
        HaveCurrentData = 2,
        HaveFutureData = 3,
        HaveEnoughData = 4,
    }

    enum NetworkState {
        Empty = 0,
        Idle = 1,
        Loading = 2,
        NoSource = 3,
    }


    interface PictureInPictureWindow {

        height: number;


        width: number;
    }

    type Player = VideoJsPlayer;

    const Player: {
        prototype: Player;


        new(player: Player, options?: PlayerOptions): Player;


        getTagSettings(tag: Element): any;
    };

    interface PlaybackRateMenuButton extends Component {
        el(): HTMLDivElement;
    }

    namespace Player {

        interface MediaObject {

            album?: string | undefined;


            artist?: string | undefined;


            artwork?: any[] | undefined;


            poster?: string | undefined;


            src?: string | Tech.SourceObject | Tech.SourceObject[] | undefined;


            title?: string | undefined;


            textTracks?: any[] | undefined;


            [key: string]: any;
        }
    }

    type PlayerOptions = VideoJsPlayerOptions;


    interface Plugin extends EventedMixin {
        player: Player;


        dispose(): void;


        getEventHash(hash?: any): Plugin.PluginEventHash;


        handleStateChanged(e: Event): void;


        version(): string;


        trigger(event: any, hash?: any): boolean;
    }

    const Plugin: {
        prototype: Plugin;


        BASE_PLUGIN_NAME: string;


        new(player: Player, options?: any): Plugin;


        deregisterPlugin(name: string): void;


        getPlugin(name: string): typeof Plugin;


        getPluginVersion(name: string): string;


        getPlugins(names?: string[]): { [name: string]: Plugin };


        isBasic(plugin: string | (() => any)): boolean;

        registerPlugin<T, K>(name: string, plugin: (this: Player, ...options: K[]) => T): (...options: K[]) => T;
        registerPlugin<T extends typeof Plugin>(name: string, plugin: T): () => T;
    };

    namespace Plugin {
        interface PluginEventHash {

            instance: Plugin;

            name: string;

            plugin: string;
        }
    }

    type Preload = "auto" | "metadata" | "none";

    type Autoplay = boolean | "muted" | "play" | "any";

    interface Breakpoint {
        tiny: number;
        xsmall: number;
        small: number;
        medium: number;
        large: number;
        xlarge: number;
        huge: number;
    }

    interface ProgressControl extends Component {

        createEl(): HTMLDivElement;


        disable(): void;

        el(): HTMLDivElement;


        enable(): void;


        enabled(): boolean;


        handleMouseDown(event: EventTarget.Event): void;


        handleMouseMove(event: EventTarget.Event): void;


        handleMouseSeek(event: EventTarget.Event): void;


        handleMouseUp(event: EventTarget.Event): void;
    }

    const ProgressControl: {
        prototype: ProgressControl;


        new(player: Player, options?: ProgressControlOptions): ProgressControl;
    };

    interface ProgressControlOptions extends ComponentOptions {
        seekBar?: boolean | undefined;
    }

    interface RemainingTimeDisplay extends Component {
        el(): HTMLDivElement;
    }

    interface Representation {
        id: string;
        width: number;
        height: number;
        bitrate: number;

        enabled(): boolean;

        enabled(enabled: boolean): void;
    }


    interface SeekBar extends Slider {

        createEl(): HTMLDivElement;


        disable(): void;


        enable(): void;


        handleAction(event: EventTarget.Event): void;


        handleEnded(event: EventTarget.Event): void;


        handleKeyPress(event: EventTarget.Event): void;


        handleMouseDown(event: EventTarget.Event): void;


        handleMouseMove(event: EventTarget.Event): void;


        handleMouseUp(event: EventTarget.Event): void;


        getPercent(): number;


        stepForward(): void;


        stepBack(): void;


        update(): number;
    }

    const SeekBar: {
        prototype: SeekBar;


        new(player: Player, options?: SliderOptions): SeekBar;
    };


    interface Slider extends Component {
        options_: SliderOptions;


        enable(): void;


        enabled(): boolean;


        disable(): void;


        createEl(type: string, props?: any, attributes?: any): Element;


        handleMouseDown(event: EventTarget.Event): void;


        handleMouseMove(event: EventTarget.Event): void;


        handleMouseUp(event: EventTarget.Event): void;


        update(): number;


        calculateDistance(event: EventTarget.Event): number;


        handleFocus(): void;


        handleFocus(): void;


        handleBlur(): void;


        handleClick(event: EventTarget.Event): void;


        vertical(bool: boolean): void;

        vertical(): boolean;
    }

    const Slider: {
        prototype: Slider;


        new(player: Player, options?: SliderOptions): Slider;
    };

    interface SliderOptions extends ComponentOptions {

        barName?: string | undefined;


        vertical?: boolean | undefined;
    }


    interface Spacer extends Component {

        buildCSSClass(): string;


        createEl(): HTMLDivElement;
    }

    const Spacer: {
        prototype: Spacer;


        new(player: Player, options?: ComponentOptions, ready?: Component.ReadyCallback): Spacer;
    };

    interface Tech extends Component {

        featuresFullscreenResize: boolean;


        featuresMuteControl: boolean;


        featuresNativeTextTracks: boolean;


        featuresPlaybackRate: boolean;


        featuresProgressEvents: boolean;


        featuresSourceset: boolean;


        featuresTimeupdateEvents: boolean;


        featuresVolumeControl: boolean;

        el: () => HTMLVideoElement | HTMLAudioElement;

        /**
         * Creates a remote text track object and returns an html track element.
         *
         * > Note: This can be an emulated {@link HTMLTrackElement} or a native one.
         *
         * @param options
         *        See {@link Tech#createRemoteTextTrack} for more detailed properties.
         *
         * @param [manualCleanup=true]
         *        - When false: the TextTrack will be automatically removed from the video
         *          element whenever the source changes
         *        - When True: The TextTrack will have to be cleaned up manually
         *
         * @return An Html Track Element.
         *
         * @deprecated The default functionality for this function will be equivalent
         *             to "manualCleanup=false" in the future. The manualCleanup parameter will
         *             also be removed.
         */
        addRemoteTextTrack(options: TextTrackOptions, manualCleanup: true): HTMLTrackElement;


        addTextTrack(kind: string, label: string, language: string): TextTrack;


        addWebVttScript_(): void;


        audioTracks(): TrackList;


        buffered(): any;


        bufferedPercent(): number;


        cleanupAutoTextTracks(): void;


        clearTracks(types: string | string[]): void;

        /**
         * Create an emulated TextTrack for use by addRemoteTextTrack
         *
         * This is intended to be overridden by classes that inherit from
         * Tech in order to create native or custom TextTracks.
         *
         * @param options
         *        The object should contain the options to initialize the TextTrack with.
         *
         * @param [options.kind]
         *        `TextTrack` kind (subtitles, captions, descriptions, chapters, or metadata).
         *
         * @param [options.label].
         *        Label to identify the text track
         *
         * @param [options.language]
         *        Two letter language abbreviation.
         *
         * @return The track element that gets created.
         */
        createRemoteTextTrack(options: TextTrackOptions): HTMLTextAreaElement;


        dispose(): void;


        emulateTextTracks(): void;


        error(err: MediaError): MediaError | null;


        getVideoPlaybackQuality(): any;


        initTrackListeners(): void;

        manualProgressOff(): void;


        manualProgressOn(): void;


        manualTimeUpdatesOff(): void;


        manualTimeUpdatesOn(): void;


        onDurationChange(event: Event): void;


        overrideNativeAudioTracks(override: boolean): void;


        overrideNativeVideoTracks(override: boolean): void;


        played(): any;


        playsinline(): any;


        remoteTextTrackEls(): HTMLTrackElementList;


        remoteTextTracks(): TextTrackList;


        removeRemoteTextTrack(track: TextTrack): void;


        reset(): void;


        setCurrentTime(): void;


        setPlaysinline(): void;


        setPoster(): void;


        stopTrackingCurrentTime(): void;


        stopTrackingProgress(): void;


        textTracks(): TextTrackList;


        trackCurrentTime(): void;


        trackProgress(event: EventTarget.Event): void;


        triggerSourceset(src: string): void;


        videoTracks(): TrackList;
    }

    const Tech: {
        prototype: Tech;


        new(options?: any, ready?: Component.ReadyCallback): Tech;


        canPlaySource(srcObj: any, options: any): CanPlayTypeResult;


        canPlayType(type: string): CanPlayTypeResult;


        getTech(name: string): Tech | undefined;


        isTech(component: any): boolean;


        registerTech(name: string, tech: any): void;


        withSourceHandlers(tech: typeof Tech): void;
    };

    namespace Tech {

        interface SourceObject {

            src: string;


            type?: string | undefined;
        }
    }


    interface TextTrackButton extends MenuButton {

        createItems(items?: TextTrackMenuItem[], TrackMenuItem?: typeof TextTrackMenuItem): TextTrackMenuItem[];
    }

    const TextTrackButton: {
        prototype: TextTrackButton;


        new(player: Player, options?: TrackButtonOptions): TextTrackButton;
    };


    interface TextTrackCueList {

        length: number;


        [index: number]: TextTrackCueList.TextTrackCue;


        getCueById(id: string): TextTrackCueList.TextTrackCue;
    }

    const TextTrackCueList: {
        prototype: TextTrackCueList;


        new(cues: TextTrackCueList.TextTrackCue[]): TextTrackCueList;
    };

    namespace TextTrackCueList {

        interface TextTrackCue {

            id: string;


            startTime: number;


            endTime: number;


            text: string;


            pauseOnExit: boolean;
        }
    }


    interface TextTrackMenuItem extends MenuItem {

        handleClick(event: EventTarget.Event): void;


        handleTracksChange(event: EventTarget.Event): void;


        handleSelectedLanguageChange(event: EventTarget.Event): void;
    }

    const TextTrackMenuItem: {
        prototype: TextTrackMenuItem;


        new(player: Player, options?: TextTrackMenuItemOptions): TextTrackMenuItem;
    };

    interface TextTrackMenuItemOptions extends MenuItemOptions {
        track: TextTrack;
    }


    interface TextTrackSettings extends ModalDialog {

        content(): Element[];


        label(): string;


        description(): string;


        buildCSSClass(): string;


        getValues(): any;


        setValues(values: any): void;


        setDefaults(): void;


        restoreSettings(): void;


        saveSettings(): void;


        updateDisplay(): void;
    }

    const TextTrackSettings: {
        prototype: TextTrackSettings;


        new(player: Player, options: TextTrackSettingsOptions): TextTrackSettings;
    };

    interface TextTrackSettingsOptions extends ModalDialogOptions {
        persistTextTrackSettings?: boolean | undefined;
    }

    /**
     * Create an instance of this class.
     *
     * @param options={}
     *        Object of option names and values
     *
     * @param options.tech
     *        A reference to the tech that owns this TextTrack.
     *
     * @param [options.kind='subtitles']
     *        A valid text track kind.
     *
     * @param [options.mode='disabled']
     *        A valid text track mode.
     *
     * @param [options.id='vjs_track_' + Guid.newGUID()]
     *        A unique id for this TextTrack.
     *
     * @param [options.label='']
     *        The menu label for this track.
     *
     * @param [options.language='']
     *        A valid two character language code.
     *
     * @param [options.srclang='']
     *        A valid two character language code. An alternative, but deprioritized
     *        version of `options.language`
     *
     * @param [options.src]
     *        A url to TextTrack cues.
     *
     * @param [options.default]
     *        If this track should default to on or off.
     */
    interface TextTrack extends Track {

        activeCues: TextTrackCueList;


        cues: TextTrackCueList;


        readonly default: boolean;


        mode: TextTrack.Mode;


        addCue(cue: TextTrackCueList.TextTrackCue): void;


        removeCue(cue: TextTrackCueList.TextTrackCue): void;
    }

    const TextTrack: {
        prototype: TextTrack;

        /**
         * Create an instance of this class.
         *
         * @param options={}
         *        Object of option names and values
         *
         * @param options.tech
         *        A reference to the tech that owns this TextTrack.
         *
         * @param [options.kind='subtitles']
         *        A valid text track kind.
         *
         * @param [options.mode='disabled']
         *        A valid text track mode.
         *
         * @param [options.id='vjs_track_' + Guid.newGUID()]
         *        A unique id for this TextTrack.
         *
         * @param [options.label='']
         *        The menu label for this track.
         *
         * @param [options.language='']
         *        A valid two character language code.
         *
         * @param [options.srclang='']
         *        A valid two character language code. An alternative, but deprioritized
         *        version of `options.language`
         *
         * @param [options.src]
         *        A url to TextTrack cues.
         *
         * @param [options.default]
         *        If this track should default to on or off.
         */
        new(options: TextTrackOptions): TextTrack;
    };

    interface TextTrackOptions extends TrackOptions {
        tech?: Tech | undefined;
        kind?: TextTrack.Kind | undefined;
        mode?: TextTrack.Mode | undefined;
        srclang?: string | undefined;
        src?: string | undefined;
        default?: boolean | undefined;
    }

    namespace TextTrack {
        type Kind = "subtitles" | "captions" | "descriptions" | "chapters" | "metadata";

        type Mode = "disabled" | "hidden" | "showing";
    }


    interface TextTrackList extends TrackList {
        [index: number]: TextTrack;


        addTrack(track: TextTrack): void;
    }

    const TextTrackList: {
        prototype: TextTrackList;


        new(tracks?: TextTrack[]): TextTrackList;
    };


    interface TimeRange {

        readonly length: number;


        end(index: number): number;


        start(index: number): number;
    }


    interface TimeDisplay extends Component {

        createEl(): HTMLDivElement;


        dispose(): void;


        updateContent(event?: EventTarget.Event): void;
    }

    const TimeDisplay: {
        prototype: TimeDisplay;


        new(player: Player, options?: ComponentOptions): TimeDisplay;
    };


    interface TimeToolTip extends Component {

        createEl(): HTMLDivElement;


        update(seekBarRect: ClientRect, seekBarPoint: number, content: string): void;
    }

    const TimeToolTip: {
        prototype: TimeToolTip;


        new(player: Player, options?: ComponentOptions): TimeToolTip;
    };


    interface Track extends EventTarget {

        readonly id: string;


        readonly kind: string;


        readonly label: string;


        readonly language: string;
    }

    const Track: {
        prototype: Track;


        new(options?: TrackOptions): Track;
    };

    interface TrackOptions {
        id?: string | undefined;
        kind?: string | undefined;
        label?: string | undefined;
        language?: string | undefined;
    }


    const TrackButton: {
        prototype: MenuButton;


        new(player: Player, options?: TrackButtonOptions): MenuButton;
    };

    interface TrackButtonOptions extends MenuButtonOptions {
        track: Track[];
    }


    interface TrackList extends EventTarget {

        length: number;

        [index: number]: Track;


        addTrack(track: Track): void;


        removeTrack(track: Track): void;
    }

    const TrackList: {
        prototype: TrackList;


        new(tracks?: Track[]): TrackList;
    };

    interface UserActions {
        click?: boolean | ((event: EventTarget.Event) => void) | undefined;
        doubleClick?: boolean | ((event: EventTarget.Event) => void) | undefined;
        hotkeys?: boolean | ((event: KeyboardEvent) => void) | UserActionHotkeys | undefined;
    }

    interface UserActionHotkeys {
        fullscreenKey?: ((event: KeyboardEvent) => boolean) | undefined;
        muteKey?: ((event: KeyboardEvent) => boolean) | undefined;
        playPauseKey?: ((event: KeyboardEvent) => boolean) | undefined;
    }


    interface VolumeBar extends Slider {

        checkMuted(): void;


        createEl(): HTMLDivElement;


        handleMouseDown(event: EventTarget.Event): void;


        getPercent(): number;


        stepBack(): void;


        stepForward(): void;


        updateARIAAttributes(event: EventTarget.Event): void;
    }

    const VolumeBar: {
        prototype: VolumeBar;


        new(player: Player, options?: SliderOptions): VolumeBar;
    };


    interface VolumeControl extends Component {

        createEl(): HTMLDivElement;


        handleMouseDown(event: EventTarget.Event): void;


        handleMouseUp(event: EventTarget.Event): void;


        handleMouseMove(event: EventTarget.Event): void;
    }

    const VolumeControl: {
        prototype: VolumeControl;


        new(player: Player, options?: VolumeControlOptions): VolumeControl;
    };

    interface VolumeControlOptions extends ComponentOptions {
        volumeBar?: VolumeBar | undefined;
        vertical?: boolean | undefined;
    }


    interface VolumeLevel extends Component {

        createEl(): HTMLDivElement;
    }

    const VolumeLevel: {
        prototype: VolumeLevel;


        new(player: Player, options?: ComponentOptions, ready?: Component.ReadyCallback): VolumeLevel;
    };


    interface VolumePanel extends Component {

        createEl(): HTMLDivElement;
    }

    const VolumePanel: {
        prototype: VolumePanel;


        new(player: Player, options?: VolumePanel): VolumePanel;
    };

    interface VolumePanelOptions extends ComponentOptions {
        inline?: boolean | undefined;
        volumeControl?: VolumeControlOptions | undefined;
    }

    namespace url {
        interface URLObject {

            protocol: string;

            hostname: string;

            port: string;

            pathname: string;

            search: string;

            hash: string;

            host: string;
        }
    }

    interface XhrObject extends Xhr {
        del: Xhr;
        get: Xhr;
        head: Xhr;
        patch: Xhr;
        post: Xhr;
        put: Xhr;
    }

    type XhrCallback = (error?: Error, response?: XhrResponse, body?: any) => void;

    interface Xhr {
        (url: string | XhrOptions, callback: XhrCallback): any;

        (url: string, options: XhrOptions, callback: XhrCallback): any;
    }

    interface XhrOptions {
        beforeSend?: ((xhrObject: XMLHttpRequest) => void) | undefined;
        body?: any;
        headers?: any;
        json?: boolean | undefined;
        method?: "DELETE" | "GET" | "HEAD" | "OPTIONS" | "POST" | "PUT" | undefined;
        password?: string | undefined;
        responseType?: "" | "arraybuffer" | "blob" | "document" | "json" | "text" | undefined;
        sync?: boolean | undefined;
        timeout?: number | undefined;
        uri?: string | undefined;
        url?: string | undefined;
        username?: string | undefined;
        useXDR?: boolean | undefined;
        xhr?: XMLHttpRequest | undefined;
        withCredentials?: boolean | undefined;
    }

    interface XhrResponse {
        body: any;
        statusCode: number;
        method: string;
        headers: any;
        url: string;
        rawRequest: XMLHttpRequest;
    }

    const Vhs: {
        xhr: {
            beforeRequest: (options: XhrOptions) => void;
        };
    };
}


export interface VideoJsPlayer extends videojs.Component {
    bigPlayButton: videojs.Button;

    controlBar: videojs.ControlBar;

    errorDisplay: videojs.ModalDialog;

    liveTracker: videojs.LiveTracker;

    loadingSpinner: videojs.Component;

    options_: videojs.PlayerOptions;

    userActivity_: boolean;

    userActive_: boolean;


    aspectRatio(ratio: string): void;

    aspectRatio(): string;


    audioOnlyMode(value: boolean): Promise<void>;

    audioOnlyMode(): boolean;


    audioPosterMode(value: boolean): Promise<void>;

    audioPosterMode(): boolean;


    autoplay(value: videojs.Autoplay): void;

    autoplay(): videojs.Autoplay;


    textTracks(): TextTrackList;


    audioTracks(): videojs.AudioTrackList;


    remoteTextTracks(): TextTrackList;


    addRemoteTextTrack(options: videojs.TextTrackOptions, manualCleanup: boolean): HTMLTrackElement;

    /**
     * A helper method for adding a {@link TextTrack} to our
     * {@link TextTrackList}.
     *
     * In addition to the W3C settings we allow adding additional info through options.
     *
     * @see http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#dom-media-addtexttrack
     *
     * @param [kind]
     *        the kind of TextTrack you are adding
     *
     * @param [label]
     *        the label to give the TextTrack label
     *
     * @param [language]
     *        the language to set on the TextTrack
     *
     * @return the TextTrack that was added or undefined
     *         if there is no tech
     */
    addTextTrack(kind?: string, label?: string, language?: string): void;

    /**
     * Get or set breakpoints on the player.
     *
     * Calling this method with an object or `true` will remove any previous
     * custom breakpoints and start from the defaults again.
     *
     * @param  [breakpoints]
     *         If an object is given, it can be used to provide custom
     *         breakpoints. If `true` is given, will set default breakpoints.
     *         If this argument is not given, will simply return the current
     *         breakpoints.
     *
     * @param  [breakpoints.tiny]
     *         The maximum width for the "vjs-layout-tiny" class.
     *
     * @param  [breakpoints.xsmall]
     *         The maximum width for the "vjs-layout-x-small" class.
     *
     * @param  [breakpoints.small]
     *         The maximum width for the "vjs-layout-small" class.
     *
     * @param  [breakpoints.medium]
     *         The maximum width for the "vjs-layout-medium" class.
     *
     * @param  [breakpoints.large]
     *         The maximum width for the "vjs-layout-large" class.
     *
     * @param  [breakpoints.xlarge]
     *         The maximum width for the "vjs-layout-x-large" class.
     *
     * @param  [breakpoints.huge]
     *         The maximum width for the "vjs-layout-huge" class.
     *
     * @return An object mapping breakpoint names to maximum width values.
     */
    breakpoints(breakpoints: true | Partial<videojs.Breakpoint>): void;

    breakpoints(): videojs.Breakpoint;


    buffered(): videojs.TimeRange;


    bufferedEnd(): number;


    bufferedPercent(): number;


    canPlayType(type: string): CanPlayTypeResult;

    cancelFullScreen(): videojs.Player;


    controls(bool: boolean): void;

    controls(): boolean;


    createEl(): Element;


    createModal(content: string | (() => any) | Element | any[], options: any): videojs.ModalDialog;


    crossOrigin(value: "anonymous" | "use-credentials"): void;

    crossOrigin(): string;


    currentBreakpoint(): string;


    currentBreakpointClass(): string;


    currentSource(): videojs.Tech.SourceObject;


    currentSources(): videojs.Tech.SourceObject[];


    currentSrc(): string;


    currentTime(seconds: number): void;

    currentTime(): number;


    currentType(): string;


    debug(enabled: boolean): void;

    /**
     * Get the current defaultMuted state, or turn defaultMuted on or off. defaultMuted
     * indicates the state of muted on initial playback.
     *
     * ```js
     *   var myPlayer = videojs('some-player-id');
     *
     *   myPlayer.src("http://www.example.com/path/to/video.mp4");
     *
     *   get, should be false
     *   console.log(myPlayer.defaultMuted());
     *   set to true
     *   myPlayer.defaultMuted(true);
     *   get should be true
     *   console.log(myPlayer.defaultMuted());
     * ```
     *
     * @param [defaultMuted]
     *        - true to mute
     *        - false to unmute
     *
     * @return - true if defaultMuted is on and getting
     *         - false if defaultMuted is off and getting
     *         - A reference to the current player when setting
     */
    defaultMuted(defaultMuted: boolean): void;

    defaultMuted(): boolean;


    defaultPlaybackRate(rate: number): videojs.Player;

    defaultPlaybackRate(): number;


    dimension(dimension: "width" | "height", value: number): void;

    dimension(dimension: "width" | "height"): number;


    disablePictureInPicture(value: boolean): void;


    dispose(): void;


    duration(seconds: number): void;

    duration(): number;


    fill(bool: boolean): void;

    fill(): boolean;


    fluid(bool: boolean): void;

    fluid(): boolean;


    getCache(): any;


    getVideoPlaybackQuality(): any;


    ended(): boolean;


    enterFullWindow(): void;


    error(err: MediaError | string | number | null): void;

    error(): MediaError | null;


    exitFullscreen(): videojs.Player;


    exitFullWindow(): void;


    exitPictureInPicture(): Promise<void>;


    getMedia(): videojs.Player.MediaObject;


    hasPlugin(name: string): boolean;


    hasStarted(request: boolean): void;

    hasStarted(): boolean;


    height(value: number): void;

    height(): number;


    isAudio(bool: boolean): void;

    isAudio(): boolean;


    isFullscreen(isFS: boolean): void;

    isFullscreen(): boolean;


    isInPictureInPicture(isPiP: boolean): void;

    isInPictureInPicture(): boolean;


    language(code: string): void;

    language(): string;


    languages(): string[];

    languageSwitch(options: any): void;


    load(): void;


    loadMedia(media: videojs.Player.MediaObject, ready: () => any): void;


    loop(value: boolean): void;

    loop(): boolean;


    muted(muted: boolean): void;

    muted(): boolean;


    networkState(): videojs.NetworkState;


    pause(): videojs.Player;


    paused(): boolean;


    play(): Promise<void> | undefined;


    playbackRate(rate: number): void;

    playbackRate(): number;


    playbackRates(rates: number[]): void;

    playbackRates(): number[];


    played(): TimeRanges;


    playsinline(value: boolean): videojs.Player;

    playsinline(): string;


    poster(src: string): void;

    poster(): string;


    preload(value?: boolean): string;


    readyState(): videojs.ReadyState;


    remainingTime(): number;


    remainingTimeDisplay(): number;


    removeRemoteTextTrack(track: HTMLTrackElement): void;


    requestFullscreen(): videojs.Player;


    requestPictureInPicture(): Promise<videojs.PictureInPictureWindow>;


    reportUserActivity(event: any): void;


    reset(): void;


    responsive(value: boolean): void;

    responsive(): boolean;


    seeking(): boolean;


    seekable(): TimeRanges;


    selectSource(sources: any[]): any;


    scrubbing(isScrubbing: boolean): void;

    scrubbing(): boolean;


    src(source: string | videojs.Tech.SourceObject | videojs.Tech.SourceObject[]): void;

    src(): string;


    supportsFullScreen(): boolean;


    tech(safety?: any): videojs.Tech;


    toJSON(): any;


    userActive(bool: boolean): void;

    userActive(): boolean;


    usingNativeControls(bool: boolean): void;

    usingNativeControls(): boolean;


    usingPlugin(name: string): boolean;


    videoHeight(): number;


    videoWidth(): number;


    volume(percentAsDecimal: number): videojs.TimeRange;

    volume(): number;


    width(value: number): void;

    width(): number;
}

export interface VideoJsPlayerOptions extends videojs.ComponentOptions {
    aspectRatio?: string | undefined;
    autoplay?: videojs.Autoplay | undefined;
    bigPlayButton?: boolean | undefined;
    controlBar?: videojs.ControlBarOptions | false | undefined;
    textTrackSettings?: videojs.TextTrackSettingsOptions | undefined;
    controls?: boolean | undefined;
    defaultVolume?: number | undefined;
    fill?: boolean | undefined;
    fluid?: boolean | undefined;
    height?: number | undefined;
    html5?: any;
    inactivityTimeout?: number | undefined;
    language?: string | undefined;
    languages?: { [code: string]: videojs.LanguageTranslations } | undefined;
    liveui?: boolean | undefined;
    loop?: boolean | undefined;
    muted?: boolean | undefined;
    nativeControlsForTouch?: boolean | undefined;
    notSupportedMessage?: string | undefined;
    playbackRates?: number[] | undefined;
    playsinline?: boolean | undefined;
    noUITitleAttributes?: boolean | undefined;
    plugins?: Partial<VideoJsPlayerPluginOptions> | undefined;
    poster?: string | undefined;
    preload?: videojs.Preload | undefined;
    responsive?: boolean | undefined;
    sourceOrder?: boolean | undefined;
    sources?: videojs.Tech.SourceObject[] | undefined;
    src?: string | undefined;
    techOrder?: string[] | undefined;
    tracks?: videojs.TextTrackOptions[] | undefined;
    userActions?: videojs.UserActions | undefined;
    width?: number | undefined;

    audioOnlyMode?: boolean | undefined;
    audioPosterMode?: boolean | undefined;
    autoSetup?: boolean | undefined;
    breakpoints?: Partial<videojs.Breakpoint> | undefined;
    fullscreen?: { options: { navigationUI: "hide" } } | undefined;
    id?: string | undefined;
    liveTracker?: {
        trackingThreshold?: number | undefined;
        liveTolerance?: number | undefined;
    } | undefined;
    normalizeAutoplay?: boolean | undefined;
    preferFullWindow?: boolean | undefined;
    restoreEl?: boolean | Element | undefined;
    suppressNotSupportedError?: boolean | undefined;
    techCanOverridePoster?: boolean | undefined;
    "vtt.js"?: string | undefined;
    disablePictureInPicture?: boolean | undefined;
    enableSourceset?: boolean | undefined;
    retryOnError?: boolean | undefined;
}

export interface VideoJsPlayerPluginOptions {
    [pluginName: string]: any;
}

declare global {
    interface Window {
        HELP_IMPROVE_VIDEOJS: boolean;

        VIDEOJS_NO_DYNAMIC_STYLE?: boolean | undefined;
    }
}