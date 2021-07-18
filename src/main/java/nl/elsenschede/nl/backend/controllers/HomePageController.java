package nl.elsenschede.nl.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping({"/api"})
@CrossOrigin(origins="https://els-enschede.herokuapp.com/")
public class HomePageController {

    @Autowired
    public HomePageController() {
        super();
    }

    @GetMapping({"/"})
    public String homepageHandle() {

        return "redirect:/";
    }
}

