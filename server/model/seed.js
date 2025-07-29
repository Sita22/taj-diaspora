const mongoose = require('./index');
const User = require('./users');
const Community = require('./comunities');
const Topic = require('./topics');
const { Post } = require('./posts');
const Comment = require('./comments');

async function seedDatabase() {
  try {
    await User.deleteMany({});
    await Community.deleteMany({});
    await Topic.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});

    const berlin = await Community.create({
      city: 'Berlin',
      country: 'Germany',
      description: 'Berlin Tajik Community'
    });
    const paris = await Community.create({
      city: 'Paris',
      country: 'France',
      description: 'Paris Tajik Community'
    });

    const user1 = await User.create({
      email: 's.sodatkadamova@gmail.com',
      username: 'sitora_sodat',
      name: 'Sitora Sodat',
      city: 'Berlin',
      country: 'Germany',
      community: berlin._id
    });
    const user2 = await User.create({
      email: 'bakhtiyor.k@mail.com',
      username: 'bakhtiyor_k',
      name: 'Bakhtiyor Karimov',
      city: 'Berlin',
      country: 'Germany',
      community: berlin._id
    });
    const user3 = await User.create({
      email: 'charo.n@outlook.com',
      username: 'charo_n',
      name: 'Charo Nazarova',
      city: 'Paris',
      country: 'France',
      community: paris._id
    });

    await Community.findByIdAndUpdate(berlin._id, {
      $push: { members: { $each: [user1._id, user2._id] } }
    });
    await Community.findByIdAndUpdate(paris._id, {
      $push: { members: user3._id }
    });

    const topicTitles = ['Events', 'Meetups', 'Admin', 'Support', 'Housing'];
    const berlinTopics = await Promise.all(
      topicTitles.map(title => Topic.create({ title, communityId: berlin._id }))
    );

    await Community.findByIdAndUpdate(berlin._id, {
      $push: { topics: { $each: berlinTopics.map(t => t._id) } }
    });

    const samplePosts = [
      {
        title: 'Upcoming Nowruz Festival – Volunteers Needed',
        content: 'We’re organizing a cultural night for Nowruz. Anyone interested in helping with food, music, or decor?'
      },
      {
        title: 'Anyone looking for a room in Kreuzberg?',
        content: 'My flatmate is moving out in August. DM me if you’re interested in a room near Kottbusser Tor.'
      },
      {
        title: 'Support with German documents',
        content: 'Is there anyone who can help me understand Anmeldung and health insurance registration?'
      },
      {
        title: 'Picnic Meetup This Sunday!',
        content: 'Let’s enjoy the weather. Bring food to share and blankets. Tiergarten, 3PM.'
      },
      {
        title: 'Visa Extension Tips?',
        content: 'If you’ve recently extended your student visa, how long did it take and what documents did you need?'
      }
    ];

    const posts = await Promise.all(
      berlinTopics.map(async (topic, index) => {
        const post1 = await Post.create({
          title: samplePosts[index % samplePosts.length].title,
          content: samplePosts[index % samplePosts.length].content,
          author: user1._id,
          topicId: topic._id,
          likes: [user2._id]
        });
        const post2 = await Post.create({
          title: `Discussion: ${topic.title.toLowerCase()} tips?`,
          content: `What are your best tips for ${topic.title.toLowerCase()} in Berlin?`,
          author: user2._id,
          topicId: topic._id,
          likes: [user1._id, user3._id]
        });
        return [post1, post2];
      })
    );

    for (let i = 0; i < berlinTopics.length; i++) {
      const topic = berlinTopics[i];
      const topicPosts = posts[i].map(post => post._id);
      await Topic.findByIdAndUpdate(topic._id, {
        $push: { posts: { $each: topicPosts } }
      });
    }

    const allPosts = posts.flat();
    for (const post of allPosts) {
      const comment1 = await Comment.create({
        postId: post._id,
        author: user3._id,
        content: 'Really helpful, thank you for sharing this!'
      });
      const comment2 = await Comment.create({
        postId: post._id,
        author: user1._id,
        content: 'Glad it helped! Let me know if you need more info.'
      });
      await Post.findByIdAndUpdate(post._id, {
        $push: { comments: { $each: [comment1._id, comment2._id] } }
      });
    }

    console.log('🌱 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();