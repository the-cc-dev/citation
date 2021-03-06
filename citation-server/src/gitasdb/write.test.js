import path from 'path';
import test from 'ava';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

const workingDirectory = 'workingDirectory';

let existsSync;
let create;
let write;

test.beforeEach(() => {
	existsSync = sinon.stub().returns(Promise.resolve([]));
	create = sinon.stub().returns(Promise.resolve([]));
	write = proxyquire('./write', {
		'./constants': { workingDirectory },
		'fs-extra': { existsSync },
		'../nodegit/wrapper': { create },
		winston: { loggers: { get: () => ({ debug: () => {}, error: () => {} }) } }
	});
});

test('writeEntry should throw error with code 409 if the id is unavailable', async t => {
	const type = 'type';
	const repositoryPath = path.resolve(workingDirectory, 'master');
	const dataPath = path.resolve(repositoryPath, type, 'foo');
	const data = { _newId_: 'foo' };
	create.withArgs(repositoryPath).returns(Promise.resolve(null));
	existsSync.withArgs(dataPath).returns(Promise.resolve(true));
	const err = await t.throws(write.writeEntry(type, data));
	t.deepEqual(err, { code: 409, message: 'Unavailable ID' });
});

test('emptyField should return true if field is an empty string', t => {
	t.true(write.emptyField(''));
});

test('emptyField should return false if field is a string', t => {
	t.false(write.emptyField('test'));
});

test('emptyField should return false if field is an entry with a role and a non empty correspondance to this role', t => {
	t.false(write.emptyField({ _role_: 'test', test: 'myTest' }));
});

test('emptyField should return true if field is an entry with a role and an empty array as correspondance to this role', t => {
	t.true(write.emptyField({ _role_: 'test', test: [] }));
});

test('emptyField should return true if field is an entry with a role and an empty entry as correspondance to this role', t => {
	t.true(write.emptyField({ _role_: 'test', test: {} }));
});
