import React from "react";

interface TeamMemberProps {
  name: string;
  role: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role }) => {
  return (
    <div className="flex justify-between mt-2">
      <div className="hover:text-blue-900 transition-colors cursor-pointer">
        {name}
      </div>
      <div className="ml-5">{role}</div>
    </div>
  );
};

const Footer: React.FC = () => {
  const teamMembers: TeamMemberProps[] = [
    { name: "Mouli Mittal", role: "Developer" },
    { name: "Tasneem Zaman", role: "UX Designer" },
    { name: "Moniparna Ghosh", role: "UX Designer" },
    { name: "Deeksha Koul", role: "Developer" },
  ];

  return (
    <footer className="bg-white px-20 py-[30px] max-md:max-w-full max-md:px-5">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-[19%] max-md:w-full max-md:ml-0">
          <div className="text-black text-2xl font-bold text-center uppercase mt-[29px] max-md:mt-10">
            JOBMATCH AI
          </div>
        </div>
        <div className="w-[45%] ml-5 max-md:w-full max-md:ml-0">
          <div className="flex flex-col self-stretch items-stretch text-black font-normal my-auto max-md:mt-10">
            <h3 className="text-2xl leading-none">Project Information</h3>
            <p className="text-sm leading-5 mt-2.5">
              JobMatch AI is a student-driven project designed to simplify job
              searching using AI-powered matching. Developed as part of our
              academic journey, it showcases our skills in AI, UX design, and
              web development.
            </p>
          </div>
        </div>
        <div className="w-[36%] ml-5 max-md:w-full max-md:ml-0">
          <div className="flex grow items-stretch gap-4 text-sm text-black font-normal leading-none max-md:mt-10">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d137a70bcab06623b29fe3d2263576e9bc583afa?placeholderIfAbsent=true"
              alt="Divider"
              className="aspect-[0] object-contain w-px shrink-0"
            />
            <div className="flex w-fit flex-col items-stretch grow shrink-0 basis-0 my-auto">
              <div className="flex w-[238px] max-w-full items-stretch gap-5 justify-between max-md:mr-2.5">
                <div className="flex flex-col">
                  <div className="font-bold">Team</div>
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className={index > 0 ? "mt-2" : "mt-[22px]"}
                    >
                      {member.name}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="font-bold">Contact</div>
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className={index > 0 ? "mt-2" : "mt-[22px]"}
                    >
                      {member.role}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-stretch text-center mt-[93px] max-md:mt-10">
                <div className="mr-[-57px] grow">
                  © 2024 — Capstone Project
                </div>
                <div className="grow shrink w-[138px] hover:text-blue-900 transition-colors cursor-pointer">
                  Privacy — Terms
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
