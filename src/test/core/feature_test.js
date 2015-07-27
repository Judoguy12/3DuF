var appRoot = "../../app/";
var should = require('should');
var Feature = require(appRoot + "core/feature");
var Parameters = require(appRoot + "core/parameters");
var Features = require(appRoot + "core/features");

var FloatValue = Parameters.FloatValue;
var IntegerValue = Parameters.IntegerValue;

var CircleValve = Features.CircleValve;
var Port = Features.Port;

var feat1;
var feat2;

function initFeatures(){
    feat1 = new Port({
        "position": [0,0]
    });
    feat2 = new CircleValve({
        "position": [5,15]
    })
}

describe("Feature", function() {
    describe("#init", function() {
        beforeEach(function initialize() {
            initFeatures();
        });
        it("should be given a unique ID on initialization", function() {
            feat1.id.should.not.equal(feat2.id);
        });
    });

    describe("#toJSON", function() {
        it("can produce JSON when containing multiple parameters", function() {

            feat1.toJSON();
            console.log(feat1.toJSON());
            feat2.toJSON();
        });
    });

    describe("#fromJSON", function() {
        it("can produce a Feature from valid JSON", function() {
            let json = {
                "id": "someValue",
                "type": "CircleValve",
                "params": {
                    "position": [0,0],
                    "height": 3
                },
                "name": "foobar"
            }
            let feat3 = Feature.fromJSON(json);
        });
        it("can produce a Feature from the output of toJSON", function() {
            let json = feat2.toJSON();
            let feat3 = Feature.fromJSON(json);
        });
        it("cannot produce a Feature from invalid JSON", function() {
            let json = {
                "params": {
                    "width": {
                        "type": FloatValue.typeString(),
                        "value": 5.1
                    },
                    "height": {
                        "type": IntegerValue.typeString(),
                        "value": 3
                    }
                }
            }
            let feat;
            (function() {
                feat = Feature.fromJSON(json)
            }).should.throwError();
        });
    });
});