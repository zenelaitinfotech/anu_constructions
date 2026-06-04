package com.apex.construction.controller;

import com.apex.construction.model.*;
import com.apex.construction.repository.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PortalController {

    private final ProjectRepository projectRepository;
    private final InsightRepository insightRepository;
    private final LeadershipMemberRepository leadershipMemberRepository;
    private final CompanyValueRepository companyValueRepository;
    private final ServiceRepository serviceRepository;
    private final ExpertiseRepository expertiseRepository;
    private final JobOpportunityRepository jobOpportunityRepository;
    private final BenefitRepository benefitRepository;
    private final ContactInquiryRepository contactInquiryRepository;
    private final EsgPillarRepository esgPillarRepository;
    private final TeamDivisionRepository teamDivisionRepository;
    private final VlogRepository vlogRepository;
    private final AboutFounderRepository aboutFounderRepository;

    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;

    @Value("${app.base-url:http://localhost:8080}")
    private String baseUrl;

    public PortalController(
            ProjectRepository projectRepository,
            InsightRepository insightRepository,
            LeadershipMemberRepository leadershipMemberRepository,
            CompanyValueRepository companyValueRepository,
            ServiceRepository serviceRepository,
            ExpertiseRepository expertiseRepository,
            JobOpportunityRepository jobOpportunityRepository,
            BenefitRepository benefitRepository,
            ContactInquiryRepository contactInquiryRepository,
            EsgPillarRepository esgPillarRepository,
            TeamDivisionRepository teamDivisionRepository,
            VlogRepository vlogRepository,
            AboutFounderRepository aboutFounderRepository) {
        this.projectRepository = projectRepository;
        this.insightRepository = insightRepository;
        this.leadershipMemberRepository = leadershipMemberRepository;
        this.companyValueRepository = companyValueRepository;
        this.serviceRepository = serviceRepository;
        this.expertiseRepository = expertiseRepository;
        this.jobOpportunityRepository = jobOpportunityRepository;
        this.benefitRepository = benefitRepository;
        this.contactInquiryRepository = contactInquiryRepository;
        this.esgPillarRepository = esgPillarRepository;
        this.teamDivisionRepository = teamDivisionRepository;
        this.vlogRepository = vlogRepository;
        this.aboutFounderRepository = aboutFounderRepository;

        // Initialize Mock Data if DB is empty
        initializeMockData();
    }

    private void initializeMockData() {
        if (projectRepository.count() == 0) {
            projectRepository.save(new Project("3BHK Luxury Villa with Pool — Mrs. Kavitha Residence", "Luxury Villa", 
                "A premium luxury villa construction incorporating architectural space planning, custom landscape design, private infinity swimming pool, Italian marble flooring, and centralized VRF air-conditioning systems.", 
                "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500&q=80", 
                "Avinashi Road, Coimbatore", "Completed", 100, "Oct 2025"));
            
            projectRepository.save(new Project("4BHK Contemporary Home — Mr. Rajesh Kumar Family", "Individual House", 
                "An elegant contemporary residential duplex featuring double-height ceiling architectural design, custom teakwood doors, expansive floor-to-ceiling glass fenestration, premium modular kitchen layout, and smart home automation controls.", 
                "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&q=80", 
                "RS Puram, Coimbatore", "Completed", 100, "May 2025"));

            projectRepository.save(new Project("Sri Lakshmi Residency — 24-Unit Apartment Complex", "Apartment Complex",
                "A structural marvel consisting of 24 premium residential apartments built on a strong pile foundation with RCC framed superstructure. Features sewage treatment plant, grid-connected solar power for common lighting, and underground sump water tanks.",
                "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&q=80",
                "Saravanampatti, Coimbatore", "In Progress", 65, "Dec 2027"));
        }

        if (insightRepository.count() <= 2) {
            insightRepository.deleteAll();
            insightRepository.save(new Insight(
                "Anu Building Constructions Breaks Ground on 100-Home Township in Coimbatore", 
                "Project Launch", 
                "May 20, 2026", 
                "Anu Building Constructions has officially launched its flagship residential township project on Avinashi Road in Saravanampatti, Coimbatore.", 
                "Anu Building Constructions has officially commenced work on its largest residential township project to date — a 100-home gated community in Saravanampatti. Spanning across 15 acres, the gated community is planned to feature 100 modern solar-ready smart houses, comprehensive underground electrical cabling systems, broad blacktop roads, integrated organic waste disposal systems, multi-tier security, and standard groundwater recharging infrastructure. Ground excavation has completed and structural engineering is currently in progress.",
                "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
            ));

            insightRepository.save(new Insight(
                "Embracing the Future: Adopting 3D Concrete Printing Tech for Housing", 
                "Innovation", 
                "May 10, 2026", 
                "Our engineering division has announced a strategic shift towards automated 3D concrete printing for individual residential homes.", 
                "Our engineering division has announced a strategic shift towards 3D concrete printing technologies for selected individual house projects in Coimbatore. By utilizing automated mortar layering machines, we expect to shrink wall construction timelines by up to 60%, drastically lower concrete waste, and achieve absolute structural precision in circular architecture. Field testing was completed and full-scale roll-outs will launch in late 2026.",
                "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80"
            ));

            insightRepository.save(new Insight(
                "Anu Building Constructions Crowned 'Best Residential Builder'", 
                "Award", 
                "March 28, 2026", 
                "We are proud to receive the prestigious Best Residential Builder award at the 2026 Construction Excellence Awards.", 
                "Anu Building Constructions was honored with the prestigious 'Best Residential Builder — South India' trophy at the 2026 Construction Excellence Awards held in Chennai. The jury recognized our commitment to delivering 250+ homes on-time with zero structural defect reports, our rigorous use of ISI-certified cement/steel, and our exemplary safety records across all individual housing and villa projects.",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
            ));

            insightRepository.save(new Insight(
                "All Upcoming Villa Projects to Feature Solar-Ready Design & EV Charging", 
                "Sustainability", 
                "April 15, 2026", 
                "Beginning early June 2026, all our premium villa constructions will integrate eco-friendly solar infrastructure and EV charger provisions.", 
                "Beginning early June 2026, every single villa constructed by Anu Building Constructions will incorporate solar panel wiring, high-capacity EV charging provisions, and structured rainwater harvesting systems as a default standard inclusion. We aim to support net-zero carbon home configurations, allowing homeowners to generate up to 80% of their daily electrical power requirements onsite.",
                "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80"
            ));

            insightRepository.save(new Insight(
                "Relief Housing Project Completed for Flood-Affected Families", 
                "Community", 
                "April 02, 2026", 
                "Anu Foundation hands over 10 permanent concrete-panel homes to families near Mettupalayam.", 
                "Our humanitarian division, Anu Foundation, has completed the construction and handover of 10 fully concrete-walled permanent houses for families affected by severe floods near Mettupalayam. Built in a record time of 45 days using prefabricated precast panels, the houses are fully waterproofed and feature elevated structural foundations to prevent future rainwater inundations.",
                "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
            ));

            insightRepository.save(new Insight(
                "Zero-Accident Safety Milestone Reached Across All Active Projects", 
                "Safety", 
                "March 15, 2026", 
                "We have recorded a milestone zero major accidents across our active jobsites during the fiscal year 2025.", 
                "We have recorded an exemplary zero major accident record across all our residential construction projects in the fiscal year 2025. This safety milestone was achieved through the implementation of daily site safety supervisor checks, mandatory harness usage for height masonry works, strict field compliance checks, and regular hazard identification training workshops.",
                "https://thumbs.dreamstime.com/b/construction-workers-building-site-delhi-india-june-engaged-reinforcing-steel-framework-under-preparing-concrete-slab-397961975.jpg"
            ));
        }

        if (leadershipMemberRepository.count() == 0) {
            leadershipMemberRepository.save(new LeadershipMember("K. Annamalai Rajan", "Chairman & Founder", "KA"));
            leadershipMemberRepository.save(new LeadershipMember("Priya Annamalai", "Managing Director & CEO", "PA"));
            leadershipMemberRepository.save(new LeadershipMember("Suresh Kumar V.", "Chief Operating Officer", "SK"));
            leadershipMemberRepository.save(new LeadershipMember("Deepa Krishnamurthy", "Chief Financial Officer", "DK"));
        }

        if (companyValueRepository.count() == 0) {
            companyValueRepository.save(new CompanyValue("Integrity", "We build on trust — every promise made is a promise kept, from foundation to finish."));
            companyValueRepository.save(new CompanyValue("Innovation", "Leveraging cutting-edge construction technology to deliver superior results faster."));
            companyValueRepository.save(new CompanyValue("Collaboration", "Partnering closely with clients, architects, and communities to create lasting value."));
            companyValueRepository.save(new CompanyValue("Sustainability", "Committed to green building practices and a net-zero future for every project we undertake."));
        }

        if (serviceRepository.count() == 0) {
            serviceRepository.save(new Service("Individual House Construction", "We design and build customized individual houses from ground up handling soil testing, foundation, structure, finishing, and utilities.", "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700&q=80"));
            serviceRepository.save(new Service("Luxury Villa Construction", "Premium villa construction with exquisite architecture, superior materials, landscaped gardens, private pools and smart home automation.", "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=700&q=80"));
            serviceRepository.save(new Service("Apartment & Multi-Storey Buildings", "Complete apartment complex construction for developers and real estate firms with full regulatory compliance and project scheduling.", "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=80"));
            serviceRepository.save(new Service("Renovation & Remodeling", "Transform your existing home or commercial space with modern facades, structural load retrofitting, and customized remodeling.", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80"));
        }

        if (expertiseRepository.count() == 0 || expertiseRepository.findAll().stream().anyMatch(e -> e.getDescription() == null)) {
            expertiseRepository.deleteAll();
            expertiseRepository.save(new Expertise(
                "Foundation & Structural Engineering",
                "High-stability pile and raft foundation designs calculated by our expert structural engineers. We ensure absolute soil-bearing load compliance and earthquake-resistant sub-structures for long-lasting stability.",
                "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80"
            ));
            expertiseRepository.save(new Expertise(
                "RCC Frame Construction",
                "High-grade concrete pouring and custom steel reinforcement layouts for pillars, beams, and slabs. We perform rigorous slump tests and curing checks to achieve maximum load-bearing capabilities.",
                "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"
            ));
            expertiseRepository.save(new Expertise(
                "Brick & Block Masonry",
                "Precise wall layout alignments utilizing premium thermal-insulated AAC blocks and fly-ash bricks. Our masonry ensures exceptional heat protection, acoustic insulation, and crack-free surfaces.",
                "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&q=80"
            ));
            expertiseRepository.save(new Expertise(
                "Roofing & Waterproofing",
                "Multi-layered water barrier applications, terrace sloping design, and crystalline waterproofing compounds. Defends your building against severe monsoon rains and structural dampness.",
                "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80"
            ));
            expertiseRepository.save(new Expertise(
                "Plumbing & Sanitary Works",
                "Corrosion-free UPVC and CPVC piping installation, sewage management systems, pressure testing, and premium sanitary fixture layouts designed for leak-proof daily operation.",
                "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80"
            ));
            expertiseRepository.save(new Expertise(
                "Electrical & Wiring",
                "Fire-retardant copper wiring, centralized distribution boards, solar inverter integration, and smart home automation path planning meeting high safety standards.",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80"
            ));
        }

        if (jobOpportunityRepository.count() == 0) {
            jobOpportunityRepository.save(new JobOpportunity("🎓", "Students & Entry Level", "Launch your construction career with one of the industry's most respected firms. We welcome motivated graduates and interns."));
            jobOpportunityRepository.save(new JobOpportunity("💼", "Experienced Professionals", "Bring your expertise to projects that shape skylines and communities across the country and around the world."));
            jobOpportunityRepository.save(new JobOpportunity("🔧", "Skilled Trade", "Join our self-perform crews and work on the most complex, technically demanding projects in the construction industry."));
            jobOpportunityRepository.save(new JobOpportunity("🎖", "Military Professionals", "We value the leadership, discipline, technical skills, and mission focus that military veterans bring to our teams."));
        }

        if (benefitRepository.count() == 0) {
            benefitRepository.save(new Benefit("Competitive salary and performance bonus programs"));
            benefitRepository.save(new Benefit("Comprehensive health, dental and vision insurance"));
            benefitRepository.save(new Benefit("401(k) retirement plan with company match"));
            benefitRepository.save(new Benefit("Professional development and continuing education"));
            benefitRepository.save(new Benefit("Tuition reimbursement for approved programs"));
            benefitRepository.save(new Benefit("Paid family and parental leave"));
        }

        if (esgPillarRepository.count() == 0) {
            esgPillarRepository.save(new EsgPillar("Environmental", 
                "https://kids.earth.org/wp-content/uploads/2023/07/Untitled-683-%C3%97-1024px-1024-%C3%97-683px-88.jpg", 
                "#16A34A", 
                List.of(
                    "Reduce construction material waste across all sites",
                    "Promote responsible disposal and recycling practices",
                    "Use energy-efficient equipment whenever possible",
                    "Source quality materials from trusted local suppliers",
                    "Encourage eco-friendly and sustainable construction methods"
                )
            ));

            esgPillarRepository.save(new EsgPillar("Social", 
                "https://cdn.prod.website-files.com/65ca7dab8cd9a1af29ec6f0f/66fab6cf7222b3ff7cd9c176_ConstructionSafetyCulture.webp", 
                "#1D4ED8", 
                List.of(
                    "Maintain strong workplace safety standards",
                    "Provide skill development and training for workers",
                    "Support local employment opportunities",
                    "Ensure fair and respectful treatment of all employees",
                    "Build long-term relationships with clients and communities"
                )
            ));

            esgPillarRepository.save(new EsgPillar("Governance", 
                "https://globallawexperts.com/wp-content/uploads/2026/04/construction-law-changes-Germany-2026-Construction-law-changes-Germany-2026-Global-Law-Experts-30-26-2026.webp", 
                "#7C3AED", 
                List.of(
                    "Maintain transparent project communication",
                    "Follow ethical business and procurement practices",
                    "Ensure compliance with construction laws and regulations",
                    "Promote accountability across all project teams",
                    "Focus on quality, integrity, and customer trust"
                )
            ));
        }

        if (teamDivisionRepository.count() == 0) {
            teamDivisionRepository.save(new TeamDivision(
                "Sales & Business Management",
                "Our proactive Sales & Business Development team is dedicated to fully understanding your unique needs and delivering tailored solutions. They work closely with you to assess your requirements, recommend the most suitable options, and guide you through each step of the sales journey.",
                List.of("Client Relationship Management", "Market Research & Analysis", "Sales Prospecting & Qualification", "Negotiation & Contract Management"),
                "https://images.unsplash.com/photo-1552581230-26425a3d4b6f?w=600&q=80"
            ));

            teamDivisionRepository.save(new TeamDivision(
                "Design & Innovation",
                "Our creative design team is passionate about crafting innovative and functional spaces. Collaborating closely with clients, they develop designs that reflect your vision and brand identity, while meticulously considering aesthetics, functionality, and sustainability.",
                List.of("Architectural & Interior Design", "Space Planning & Layout", "Material Selection & Specification", "3D Visualisation & Rendering"),
                "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&q=80"
            ));

            teamDivisionRepository.save(new TeamDivision(
                "Project Management Consultancy",
                "At the heart of every successful project is a team that ensures flawless coordination, timely delivery, and uncompromising quality — meet our Project Management Committee.\n\nThis core unit acts as the backbone of our operations, seamlessly bridging the gap between design vision and on-ground execution. Whether it’s managing tight timelines, aligning cross-functional teams, or navigating on-site challenges, our committee ensures that every project is delivered with precision, professionalism, and purpose.\n\nWith a sharp focus on project milestones, quality control, and client communication, they are the driving force that turns complex ideas into tangible realities — on time, every time.",
                Collections.emptyList(),
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80"
            ));
        }

        if (vlogRepository.count() == 0) {
            vlogRepository.save(new Vlog(
                "3BHK Luxury Villa — Full Construction Time-Lapse",
                "Watch the complete journey of a premium 3BHK luxury villa from foundation to final handover in this stunning construction time-lapse. See the transformation from bare land to a finished luxury home.",
                "https://www.youtube.com/embed/dQw4w9WgXcQ",
                null,
                "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=700&q=80",
                "Construction",
                "May 28, 2026"
            ));

            vlogRepository.save(new Vlog(
                "Interior Design Reveal — Modern Apartment Fit-Out",
                "A complete walkthrough of our latest interior design project — a modern apartment featuring custom modular kitchen, false ceiling LED designs, and imported marble flooring.",
                "https://www.youtube.com/embed/dQw4w9WgXcQ",
                null,
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80",
                "Interior Design",
                "May 15, 2026"
            ));

            vlogRepository.save(new Vlog(
                "3D Visualization Process — From Concept to Render",
                "See how our 3D visualization team transforms a simple floor plan into a hyper-realistic rendered walkthrough that helps clients visualize their dream home before construction begins.",
                "https://www.youtube.com/embed/dQw4w9WgXcQ",
                null,
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
                "3D Visualization",
                "April 30, 2026"
            ));
        }

        if (aboutFounderRepository.count() == 0) {
            aboutFounderRepository.save(new AboutFounder(
                "About Anu Building Constructions",
                "Meet Our Founder & Managing Director",
                "Anu Building Constructions, established in 2004, has grown to become Coimbatore's and South India's trusted premier builder of dream homes, luxury villas, apartment complexes, and high-quality commercial structures. Under the dynamic leadership of our founder, we have successfully handed over more than 2,500 projects. Our commitment to excellence, transparent pricing, premium certified materials, and on-time delivery form the foundation of our long-term client relationships. We continue to innovate with sustainable building designs and advanced prefabricated office systems.",
                "Mr. P. Anbarasan",
                "Founder & Managing Director",
                "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"
            ));
        }
    }

    private boolean isAdmin(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Basic ")) {
            return false;
        }
        try {
            String base64Credentials = authHeader.substring("Basic ".length()).trim();
            byte[] decoded = Base64.getDecoder().decode(base64Credentials);
            String credentials = new String(decoded, java.nio.charset.StandardCharsets.UTF_8);
            String[] values = credentials.split(":", 2);
            return values.length == 2 && adminUsername.equals(values[0]) && adminPassword.equals(values[1]);
        } catch (Exception e) {
            return false;
        }
    }

    // AUTH LOGIN ENDPOINT
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        if (adminUsername.equals(username) && adminPassword.equals(password)) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("token", Base64.getEncoder().encodeToString((username + ":" + password).getBytes()));
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
    }

    // --- PROJECTS ---
    @GetMapping("/projects")
    public List<Project> getProjects() {
        return projectRepository.findAll();
    }

    @PostMapping("/projects")
    public ResponseEntity<?> createProject(@RequestBody Project proj, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(projectRepository.save(proj));
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<?> updateProject(@PathVariable Long id, @RequestBody Project proj, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return projectRepository.findById(id).map(p -> {
            p.setTitle(proj.getTitle());
            p.setCategory(proj.getCategory());
            p.setDescription(proj.getDescription());
            p.setImage(proj.getImage());
            p.setLocation(proj.getLocation());
            p.setStatus(proj.getStatus());
            p.setProgress(proj.getProgress());
            p.setCompletionDate(proj.getCompletionDate());
            return ResponseEntity.ok(projectRepository.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- INSIGHTS / NEWS ---
    @GetMapping("/insights")
    public List<Insight> getInsights() {
        return insightRepository.findAll();
    }

    @PostMapping("/insights")
    public ResponseEntity<?> createInsight(@RequestBody Insight insight, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(insightRepository.save(insight));
    }

    @PutMapping("/insights/{id}")
    public ResponseEntity<?> updateInsight(@PathVariable Long id, @RequestBody Insight insight, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return insightRepository.findById(id).map(i -> {
            i.setTitle(insight.getTitle());
            i.setCategory(insight.getCategory());
            i.setDate(insight.getDate());
            i.setSummary(insight.getSummary());
            i.setContent(insight.getContent());
            i.setImageUrl(insight.getImageUrl());
            return ResponseEntity.ok(insightRepository.save(i));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/insights/{id}")
    public ResponseEntity<?> deleteInsight(@PathVariable Long id, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (insightRepository.existsById(id)) {
            insightRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- LEADERSHIP ---
    @GetMapping("/leadership")
    public List<LeadershipMember> getLeadership() {
        return leadershipMemberRepository.findAll();
    }

    @PostMapping("/leadership")
    public ResponseEntity<?> createLeadership(@RequestBody LeadershipMember lm, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(leadershipMemberRepository.save(lm));
    }

    @PutMapping("/leadership/{id}")
    public ResponseEntity<?> updateLeadership(@PathVariable Long id, @RequestBody LeadershipMember lm, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return leadershipMemberRepository.findById(id).map(member -> {
            member.setName(lm.getName());
            member.setRole(lm.getRole());
            member.setInitials(lm.getInitials());
            return ResponseEntity.ok(leadershipMemberRepository.save(member));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/leadership/{id}")
    public ResponseEntity<?> deleteLeadership(@PathVariable Long id, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (leadershipMemberRepository.existsById(id)) {
            leadershipMemberRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- COMPANY VALUES ---
    @GetMapping("/company-values")
    public List<CompanyValue> getCompanyValues() {
        return companyValueRepository.findAll();
    }

    @PostMapping("/company-values")
    public ResponseEntity<?> createCompanyValue(@RequestBody CompanyValue cv, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(companyValueRepository.save(cv));
    }

    @PutMapping("/company-values/{id}")
    public ResponseEntity<?> updateCompanyValue(@PathVariable Long id, @RequestBody CompanyValue cv, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return companyValueRepository.findById(id).map(val -> {
            val.setTitle(cv.getTitle());
            val.setDescription(cv.getDescription());
            return ResponseEntity.ok(companyValueRepository.save(val));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/company-values/{id}")
    public ResponseEntity<?> deleteCompanyValue(@PathVariable Long id, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (companyValueRepository.existsById(id)) {
            companyValueRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- SERVICES ---
    @GetMapping("/services")
    public List<Service> getServices() {
        return serviceRepository.findAll();
    }

    @PostMapping("/services")
    public ResponseEntity<?> createService(@RequestBody Service serv, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(serviceRepository.save(serv));
    }

    @PutMapping("/services/{id}")
    public ResponseEntity<?> updateService(@PathVariable Long id, @RequestBody Service serv, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return serviceRepository.findById(id).map(s -> {
            s.setTitle(serv.getTitle());
            s.setDescText(serv.getDescText());
            s.setImg(serv.getImg());
            return ResponseEntity.ok(serviceRepository.save(s));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<?> deleteService(@PathVariable Long id, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (serviceRepository.existsById(id)) {
            serviceRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- EXPERTISE ---
    @GetMapping("/expertise")
    public List<Expertise> getExpertise() {
        return expertiseRepository.findAll();
    }

    @PostMapping("/expertise")
    public ResponseEntity<?> createExpertise(@RequestBody Expertise exp, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(expertiseRepository.save(exp));
    }

    @PutMapping("/expertise/{id}")
    public ResponseEntity<?> updateExpertise(@PathVariable Long id, @RequestBody Expertise exp, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return expertiseRepository.findById(id).map(e -> {
            e.setName(exp.getName());
            e.setDescription(exp.getDescription());
            e.setImageUrl(exp.getImageUrl());
            return ResponseEntity.ok(expertiseRepository.save(e));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/expertise/{id}")
    public ResponseEntity<?> deleteExpertise(@PathVariable Long id, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (expertiseRepository.existsById(id)) {
            expertiseRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- CAREERS ---
    @GetMapping("/careers")
    public List<JobOpportunity> getCareers() {
        return jobOpportunityRepository.findAll();
    }

    @PostMapping("/careers")
    public ResponseEntity<?> createCareer(@RequestBody JobOpportunity job, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(jobOpportunityRepository.save(job));
    }

    @PutMapping("/careers/{id}")
    public ResponseEntity<?> updateCareer(@PathVariable Long id, @RequestBody JobOpportunity job, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return jobOpportunityRepository.findById(id).map(j -> {
            j.setIcon(job.getIcon());
            j.setTitle(job.getTitle());
            j.setDescription(job.getDescription());
            return ResponseEntity.ok(jobOpportunityRepository.save(j));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/careers/{id}")
    public ResponseEntity<?> deleteCareer(@PathVariable Long id, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (jobOpportunityRepository.existsById(id)) {
            jobOpportunityRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- BENEFITS ---
    @GetMapping("/benefits")
    public List<Benefit> getBenefits() {
        return benefitRepository.findAll();
    }

    @PostMapping("/benefits")
    public ResponseEntity<?> createBenefit(@RequestBody Benefit ben, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(benefitRepository.save(ben));
    }

    @PutMapping("/benefits/{id}")
    public ResponseEntity<?> updateBenefit(@PathVariable Long id, @RequestBody Benefit ben, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return benefitRepository.findById(id).map(b -> {
            b.setBenefitText(ben.getBenefitText());
            return ResponseEntity.ok(benefitRepository.save(b));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/benefits/{id}")
    public ResponseEntity<?> deleteBenefit(@PathVariable Long id, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (benefitRepository.existsById(id)) {
            benefitRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- STATS ---
    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("revenueUSD", "4.2 Billion");
        stats.put("activeProjectsCount", projectRepository.count());
        stats.put("safetyEMR", 0.45);
        return stats;
    }

    // --- UPLOADS ---
    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "File is empty"));
            }
            String uploadDir = "../frontend/public/uploads";
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String newFilename = UUID.randomUUID().toString() + extension;
            Path path = Paths.get(uploadDir, newFilename);
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            String fileUrl = "/uploads/" + newFilename;
            return ResponseEntity.ok(Map.of("url", fileUrl));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to upload file: " + e.getMessage()));
        }
    }

    @GetMapping("/uploads")
    public ResponseEntity<?> listUploadedFiles() {
        try {
            String uploadDir = "../frontend/public/uploads";
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                return ResponseEntity.ok(Collections.emptyList());
            }
            File[] files = directory.listFiles();
            List<Map<String, String>> fileList = new ArrayList<>();
            if (files != null) {
                for (File f : files) {
                    if (f.isFile()) {
                        fileList.add(Map.of(
                            "name", f.getName(),
                            "url", "/uploads/" + f.getName()
                        ));
                    }
                }
            }
            return ResponseEntity.ok(fileList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to list files: " + e.getMessage()));
        }
    }

    // --- CONTACT INQUIRIES ---
    @GetMapping("/contact")
    public ResponseEntity<?> getContactInquiries(@RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.ok(contactInquiryRepository.findAll());
    }

    @PostMapping("/contact")
    public ResponseEntity<?> createContactInquiry(@RequestBody ContactInquiry inquiry) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contactInquiryRepository.save(inquiry));
    }

    @DeleteMapping("/contact/{id}")
    public ResponseEntity<?> deleteContactInquiry(@PathVariable Long id, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (contactInquiryRepository.existsById(id)) {
            contactInquiryRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- ESG STRATEGY PILLARS ---
    @GetMapping("/esg")
    public List<EsgPillar> getEsgPillars() {
        return esgPillarRepository.findAll();
    }

    @PostMapping("/esg")
    public ResponseEntity<?> createEsgPillar(@RequestBody EsgPillar pillar, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(esgPillarRepository.save(pillar));
    }

    @PutMapping("/esg/{id}")
    public ResponseEntity<?> updateEsgPillar(@PathVariable Long id, @RequestBody EsgPillar pillar, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return esgPillarRepository.findById(id).map(p -> {
            p.setTitle(pillar.getTitle());
            p.setIcon(pillar.getIcon());
            p.setColor(pillar.getColor());
            p.setItems(pillar.getItems());
            return ResponseEntity.ok(esgPillarRepository.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/esg/{id}")
    public ResponseEntity<?> deleteEsgPillar(@PathVariable Long id, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (esgPillarRepository.existsById(id)) {
            esgPillarRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- TEAM DIVISIONS ---
    @GetMapping("/team-divisions")
    public List<TeamDivision> getTeamDivisions() {
        return teamDivisionRepository.findAll();
    }

    @PostMapping("/team-divisions")
    public ResponseEntity<?> createTeamDivision(@RequestBody TeamDivision td, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(teamDivisionRepository.save(td));
    }

    @PutMapping("/team-divisions/{id}")
    public ResponseEntity<?> updateTeamDivision(@PathVariable Long id, @RequestBody TeamDivision td, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return teamDivisionRepository.findById(id).map(t -> {
            t.setTitle(td.getTitle());
            t.setDescription(td.getDescription());
            t.setBullets(td.getBullets());
            t.setImageUrl(td.getImageUrl());
            return ResponseEntity.ok(teamDivisionRepository.save(t));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/team-divisions/{id}")
    public ResponseEntity<?> deleteTeamDivision(@PathVariable Long id, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (teamDivisionRepository.existsById(id)) {
            teamDivisionRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- VLOGS ---
    @GetMapping("/vlogs")
    public List<Vlog> getVlogs() {
        return vlogRepository.findAll();
    }

    @PostMapping("/vlogs")
    public ResponseEntity<?> createVlog(@RequestBody Vlog v, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(vlogRepository.save(v));
    }

    @PutMapping("/vlogs/{id}")
    public ResponseEntity<?> updateVlog(@PathVariable Long id, @RequestBody Vlog v, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return vlogRepository.findById(id).map(existing -> {
            existing.setTitle(v.getTitle());
            existing.setDescription(v.getDescription());
            existing.setVideoUrl(v.getVideoUrl());
            existing.setDriveUrl(v.getDriveUrl());
            existing.setThumbnailUrl(v.getThumbnailUrl());
            existing.setCategory(v.getCategory());
            existing.setDate(v.getDate());
            return ResponseEntity.ok(vlogRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/vlogs/{id}")
    public ResponseEntity<?> deleteVlog(@PathVariable Long id, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (vlogRepository.existsById(id)) {
            vlogRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- ABOUT FOUNDER ---
    @GetMapping("/about-founder")
    public List<AboutFounder> getAboutFounder() {
        return aboutFounderRepository.findAll();
    }

    @PostMapping("/about-founder")
    public ResponseEntity<?> createAboutFounder(@RequestBody AboutFounder af, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(aboutFounderRepository.save(af));
    }

    @PutMapping("/about-founder/{id}")
    public ResponseEntity<?> updateAboutFounder(@PathVariable Long id, @RequestBody AboutFounder af, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return aboutFounderRepository.findById(id).map(existing -> {
            existing.setTitle(af.getTitle());
            existing.setSubtitle(af.getSubtitle());
            existing.setContent(af.getContent());
            existing.setFounderName(af.getFounderName());
            existing.setFounderRole(af.getFounderRole());
            existing.setImageUrl(af.getImageUrl());
            return ResponseEntity.ok(aboutFounderRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/about-founder/{id}")
    public ResponseEntity<?> deleteAboutFounder(@PathVariable Long id, @RequestHeader(value = "Authorization", required = false) String auth) {
        if (!isAdmin(auth)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (aboutFounderRepository.existsById(id)) {
            aboutFounderRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
