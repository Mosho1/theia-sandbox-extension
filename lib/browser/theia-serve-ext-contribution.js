"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var browser_1 = require("@theia/workspace/lib/browser");
var browser_2 = require("@theia/editor/lib/browser");
var uri_1 = require("@theia/core/lib/common/uri");
exports.TheiaServeExtCommand = {
    id: 'TheiaServeExt.command',
    label: 'Run current file'
};
var RunMenus;
(function (RunMenus) {
    RunMenus.RUN = __spread(common_1.MAIN_MENU_BAR, ['4_run']);
})(RunMenus = exports.RunMenus || (exports.RunMenus = {}));
var iframe = null;
var runModule = function (path, port) {
    if (port === void 0) { port = 4000; }
    return __awaiter(_this, void 0, void 0, function () {
        var url, script;
        return __generator(this, function (_a) {
            if (iframe)
                document.body.removeChild(iframe);
            url = location.protocol + "//" + location.hostname + ":" + port + "/" + path.replace(/^\//, '');
            iframe = document.createElement('iframe');
            document.body.appendChild(iframe);
            script = document.createElement('script');
            script.type = 'module';
            script.src = url;
            if (iframe.contentWindow)
                iframe.contentWindow.document.body.appendChild(script);
            return [2 /*return*/];
        });
    });
};
var TheiaServeExtCommandContribution = /** @class */ (function () {
    function TheiaServeExtCommandContribution(editors, workspaceService, messageService) {
        this.editors = editors;
        this.workspaceService = workspaceService;
        this.messageService = messageService;
    }
    Object.defineProperty(TheiaServeExtCommandContribution.prototype, "currentRelativePath", {
        get: function () {
            var currentEditor = this.editors.currentEditor;
            if (!currentEditor)
                return null;
            var resourceUri = currentEditor.getResourceUri();
            if (!resourceUri)
                return null;
            var workspace = this.workspaceService.workspace;
            if (!workspace)
                return null;
            var workspaceUri = new uri_1.default(workspace.uri);
            return workspaceUri.relative(resourceUri);
        },
        enumerable: true,
        configurable: true
    });
    TheiaServeExtCommandContribution.prototype.registerCommands = function (registry) {
        var _this = this;
        registry.registerCommand(exports.TheiaServeExtCommand, {
            execute: function () { return __awaiter(_this, void 0, void 0, function () {
                var path, rawPath, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            path = this.currentRelativePath;
                            if (!path) return [3 /*break*/, 5];
                            rawPath = path.raw;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, runModule(rawPath)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            this.messageService.error('could not run file!');
                            console.error(e_1);
                            return [3 /*break*/, 4];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            this.messageService.info('nothing open!');
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            }); }
        });
    };
    TheiaServeExtCommandContribution.prototype.registerKeybindings = function (keybindings) {
        keybindings.registerKeybinding({
            command: exports.TheiaServeExtCommand.id,
            keybinding: 'ctrl+f6',
            context: browser_2.EditorKeybindingContexts.editorTextFocus
        });
    };
    TheiaServeExtCommandContribution.prototype.registerMenus = function (menus) {
        menus.registerSubmenu(RunMenus.RUN, 'Run');
        menus.registerMenuAction(RunMenus.RUN, {
            commandId: exports.TheiaServeExtCommand.id,
            label: exports.TheiaServeExtCommand.label,
        });
    };
    TheiaServeExtCommandContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_2.EditorManager)),
        __param(1, inversify_1.inject(browser_1.WorkspaceService)),
        __param(2, inversify_1.inject(common_1.MessageService)),
        __metadata("design:paramtypes", [browser_2.EditorManager,
            browser_1.WorkspaceService,
            common_1.MessageService])
    ], TheiaServeExtCommandContribution);
    return TheiaServeExtCommandContribution;
}());
exports.TheiaServeExtCommandContribution = TheiaServeExtCommandContribution;
//# sourceMappingURL=theia-serve-ext-contribution.js.map