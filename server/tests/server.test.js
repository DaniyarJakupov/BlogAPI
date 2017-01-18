const expect    = require('expect');
const request   = require('supertest');

const {ObjectID} = require('mongodb');
const {app}  =require('./../server');
const {Post} = require('./../models/post');

const posts = [{
    _id: new ObjectID(),
    title: 'First test post',
    content: 'Text is here'
}, {
    _id: new ObjectID(),
    title: 'Second test post',
    content: 'Text is here'
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
      const image = 'imgur.com';

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

describe('DELETE /posts/:id', () => {
    it('should remove a post', (done) => {
        var hexID = posts[0]._id.toHexString();
        request(app)
            .delete(`/posts/${hexID}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.post._id).toBe(hexID)
            })
            .end((err, res) => {
            if(err){
                return done(err);
            }
            Post.findById(hexID).then((post)=>{
                expect(post).toNotExist();
                done();
            }).catch((e) => done(e));
            });
    });

    it('should return 404 if post not found', (done) => {
       request(app)
           .delete(`/posts/${randomID.toHexString}`)
           .expect(404)
           .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {
        request(app)
            .delete('/posts/1234567')
            .expect(404)
            .end(done);
    });
});

describe('PATCH /posts/:id', () => {
   it('should update the post', (done)=>{
       const newTitle = 'First test post UPD';
       request(app)
           .patch(`/posts/${posts[0]._id.toHexString()}`)
           .send({title: newTitle})
           .expect(200)
           .expect((res)=>{
               expect(res.body.post.title).toBe(newTitle);
           })
           .end(done);
   });
});