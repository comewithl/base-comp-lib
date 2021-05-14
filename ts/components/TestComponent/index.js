"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var antd_1 = require("antd");
require("./index.less");
var TestComponent = function (props) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "test-component-wrapper" },
            "12312",
            react_1.default.createElement(antd_1.Input, null))));
};
exports.default = TestComponent;
//# sourceMappingURL=index.js.map