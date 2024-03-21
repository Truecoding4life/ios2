const router = require("express").Router();
const { Resource, User, Project, Category, Comment, Like } = require("../models");

// home route
router.get("/", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const dbCategoryData = await Category.findAll({});
      const categories = dbCategoryData.map((category) =>
        category.get({ plain: true })
      );
      const dbResourceData = await Resource.findAll({
        include: [
          { model: User, attributes: ["username"] },
          { model: Category, attributes: ["category_name"] },
          { model: Like, attributes: ["user_id"] }
        ],
        order: [["createdAt", "DESC"]] // Order resources by creation date

      });
      const resources = dbResourceData.map((resource)=>
      resource.get({plain:true}));
      let data =[];
      for ( let i = resources.length -1; i >= 0; i--){
        data.push(resources[i])
      }
      console.log("THIS IS DATA SEND FROM HOME ROUTE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
      console.log(data[0].likes);
      res.render("homepage", {
        categories,
        loggedIn: req.session.loggedIn,
        resources: data,
      });
    } else {
      res.status(200).render("welcomepage");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Dashboard route
router.get("/dashboard", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const dbCategoryData = await Resource.findAll({
        where: {
          user_id: req.session.user_id,
        },
        include: [ { model: Category, attributes: ["category_name"] },
                  { model: Like, attributes: ["user_id"]}]
                 
      });
      const resources = dbCategoryData.map((category) =>
        category.get({ plain: true })
      );
      let data =[];
      let Likes =[]
      for ( let i = resources.length -1; i >= 0; i--){
        data.push(resources[i])
        Likes.push(resources[i].likes)
      }
      res.render("dashboard", {
        Likes,
        resources: data,
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id,
      });
    } else {
      res.status(200).render("login");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Resource by category route
router.get("/category/:id", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const dbcategoryData = await Resource.findAll({
        where: {
          category_id: req.params.id,
        },
        include: { model: Category, attributes: ["category_name"] },
      });
      const resources = dbcategoryData.map((category) =>
        category.get({ plain: true })
      );
      res.render("resource-by-category", {
        resources,
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id,
        id: req.params.id,
      });
    } else {
      res.status(200).render("login");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Project route
router.get("/project/:id", async (req, res) => {
  try {
    const dbprojectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: Project,
          attributes: ["title", "user_id"],
          include: [{ model: Project, include: [{ model: User }] }],
        },
      ],
    });

    // const project = dbprojectData.get({ plain: true });
    // res.render('project', { project, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Project route
router.get("/project", async (req, res) => {
  try {
    const projectData = await Project.findAll({
      where: { user_id: req.session.user_id },
    });
    const projects = projectData.map((project) => project.get({ plain: true }));
    res.render("project", { projects, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// login route
router.get("/login", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.status(200).redirect("/");
      return;
    }
    // Otherwise, render the 'login' template
    res.status(200).render("login");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});



router.get("/resource/:id", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const resourceData = await Resource.findByPk(req.params.id, {
        include: [
          {
            model: User,
          },
          { model: Like, attributes: ["id"]},
        ],
      });
      const commentsData = await Comment.findAll({
        where: { resource_id: req.params.id },
      
      })

      let sendBackData = [];
      if (resourceData) {
        const resource = resourceData.get({ plain: true });
      
        for( let i = commentsData.length -1; i >= 0; i--){
          sendBackData.push(commentsData[i].get({ plain: true }));
        };
        console.log("Resource Data:", sendBackData); // Log the resource data

        res.status(200).render("one-resource-detail", {
          comments: sendBackData,
          resource: resource,
          loggedIn: req.session.loggedIn,
        });
      } else {
        res.status(404).render("dashboard");
      }
    }
    else{
      res.status(404).redirect('login')
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/logout", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).redirect("login");
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).render('/');
  }
});

module.exports = router;
