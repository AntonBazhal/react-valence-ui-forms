'use strict';

jest.dontMock('../lib/select');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	Validation = require('../lib/index');

describe('select', function() {

	var getSynchronousValidator = function(isValid, message) {
		return function(component, value) {
			return {
				isValid: isValid,
				message: message
			};
		};
	};

	it('implements the onValidate function', function() {

		var select = TestUtils.renderIntoDocument(
			<Validation.Select />
		);

		expect(select.onValidate).toBeDefined();

	});

	describe('render', function() {

		it('renders children', function() {

			var select = TestUtils.renderIntoDocument(
				<Validation.Select><option>moose</option></Validation.Select>
			);

			expect(select.getDOMNode().firstChild.firstChild.textContent).toBe('moose');

		});

		pit('renders as invalid when validation returns inValid=false', function() {

			var select = TestUtils.renderIntoDocument(
				<Validation.Select validators={getSynchronousValidator(false,'a message')} />
			);

			return select.validate().then(function(result) {
				expect(result.isValid).toBeFalsy();
				expect(result.message).toBe('a message');
				expect(select.getDOMNode().firstChild.getAttribute('aria-invalid')).toBeTruthy();
			});

		});

		pit('renders as valid when validation returns inValid=true', function() {

			var select = TestUtils.renderIntoDocument(
				<Validation.Select validators={getSynchronousValidator(true)} />
			);

			return select.validate().then(function(result) {
				expect(result.isValid).toBeTruthy();
				expect(select.getDOMNode().firstChild.getAttribute('aria-invalid')).toBeNull();
			});

		});

	});

});
