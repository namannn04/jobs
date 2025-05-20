
import React from "react";

const Footer: React.FC = () => {
  const teamMembers = [
    { name: "Mouli Mittal", role: "Developer" },
    { name: "Tasneem Zaman", role: "UX Designer" },
    { name: "Moniparna Ghosh", role: "UX Designer" },
    { name: "Deeksha Koul", role: "Developer" },
  ];

  return (
    <footer className="bg-[rgba(242,242,242,1)] w-full px-20 py-[50px] max-md:max-w-full max-md:px-5">
      <div className="flex max-w-[1100px] mx-auto max-md:flex-col max-md:items-stretch">
        <div className="w-[65%] max-md:w-full max-md:ml-0">
          <div className="flex flex-col text-black max-md:max-w-full max-md:mt-10">
            <div className="text-2xl font-bold uppercase">
              JOBMATCH AI
            </div>
            <div className="mt-[30px]">
              <h2 className="text-xl font-medium">Project Information</h2>
              <p className="text-sm leading-5 mt-4 max-w-[500px]">
                JobMatch AI is a student-driven project designed to simplify job
                searching using AI-powered matching. Developed as part of our
                academic journey, it showcases our skills in AI, UX design, and
                web development.
              </p>
            </div>
            <div className="mt-[30px]">
              <h3 className="text-sm font-bold">Disclaimer</h3>
              <p className="text-sm leading-5 mt-4 max-w-[500px]">
                This project is for educational purposes only. JobMatch AI is
                not a commercial platform, and we do not collect or store
                personal data.
              </p>
            </div>
          </div>
        </div>
        <div className="w-[35%] max-md:w-full max-md:ml-0">
          <div className="flex h-full border-l border-gray-300 pl-10 max-md:pl-0 max-md:border-0 max-md:mt-10">
            <div className="flex flex-col w-full">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h3 className="font-bold">Team</h3>
                  {teamMembers.map((member, index) => (
                    <div key={index} className="mt-4 text-sm" data-testid={`team-member-${member.name}`}>
                      {member.name}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold">Contact</h3>
                  {teamMembers.map((member, index) => (
                    <div key={index} className="mt-4 text-sm">
                      {member.role}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-auto pt-[60px] text-sm">
                <div>© 2024 — Capstone Project</div>
                <div>Privacy — Terms</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
