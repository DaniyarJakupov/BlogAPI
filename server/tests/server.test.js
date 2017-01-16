const expect    = require('expect');
const request   = require('supertest');

const {ObjectID} = require('mongodb');
const {app}  =require('./../server');
const {Post} = require('./../models/post');

const posts = [{
    _id: new ObjectID(),
    title: 'First test post',
    content: 'Some text'
}, {
    _id: new ObjectID(),
    title: 'Second test post',
    content: 'Some text'
}];

const randomID = new ObjectID();

beforeEach((done) => {
   Post.remove({}).then(() => {
       return Post.insertMany(posts);
   }).then(() => done());
});

describe('POST /posts', ()=>{
   it('should create a new post', (done)=>{
      const title = 'test post title';
      const content = 'test post content';

      request(app)
          .post('/posts')
          .send({title})
          .send({content})
          .expect(200)
          .expect((res)=>{
            expect(res.body.title).toBe(title);
            expect(res.body.content).toBe(content);
          })
          .end((error, res) => {
            if(error){
                return done(error);
            }

            Post.find().then((posts)=>{
                expect(posts.length).toBe(3);
                expect(posts[2].title).toBe(title);
                expect(posts[2].content).toBe(content);
                done();
            }).catch((e) => done(e));
          });
   });

   it('should not create post with invalid body data', (done) => {
      request(app)
          .post('/posts')
          .send({})
          .send({})
          .expect(400)
          .end((error, res) => {
              if(error){
                  return done(error);
              }

              Post.find().then((posts) => {
                  expect(posts.length).toBe(2);
                  done();
              }).catch((e) => done(e));
          });
   });
});

describe('GET /posts', () => {
   it('should get all posts', (done) => {
      request(app)
          .get('/posts')
          .expect(200)
          .expect((res) => {
            expect(res.body.posts.length).toBe(2);
          })
          .end(done);
   });
});

describe('GET /posts/:id', () => {
   it('should get one particular post', (done) => {
      request(app)
          .get(`/posts/${posts[0]._id.toHexString()}`)
          .expect(200)
          .expect((res)=>{
            expect(res.body.post.title).toBe(posts[0].title);
          })
          .end(done);
   });

   it('should return 404 if post not found', (done) => {
       request(app)
           .get(`/posts/${randomID.toHexString}`)
           .expect(404)
           .end(done);
   });

   it('should return 404 for non-object ids', (done) => {
      request(app)
          .get('/posts/1234567')
          .expect(404)
          .end(done);
   });
});