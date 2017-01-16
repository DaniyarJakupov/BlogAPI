const expect    = require('expect');
const request   = require('supertest');

const {app}  =require('./../server');
const {Post} = require('./../models/post');

beforeEach((done) => {
   Post.remove({}).then(() => done());
});

describe('POST /posts', ()=>{
   it('should create a new post', (done)=>{
      var title = 'test post title';
      var content = 'test post content';

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
                expect(posts.length).toBe(1);
                expect(posts[0].title).toBe(title);
                expect(posts[0].content).toBe(content);
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
                  expect(posts.length).toBe(0);
                  done();
              }).catch((e) => done(e));
          });
   });
});