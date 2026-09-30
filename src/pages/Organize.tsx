import React from 'react';
import { Mail, User, MapPin, Phone } from 'lucide-react';

interface CommitteeMember {
  name: string;
  photo?: string;
  affiliation?: string;
  role?: string;
}

interface CommitteeGroup {
  title: string;
  members: CommitteeMember[];
}

const Organize: React.FC = () => {
  const getAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=160&background=3b82f6&color=ffffff&font-size=0.4`;
  };

  const MemberCard: React.FC<{ member: CommitteeMember }> = ({ member }) => (
    <div className="flex flex-col items-center text-center">
      <div className="w-28 h-28 rounded-full overflow-hidden shadow-md mb-2 bg-gray-100 flex items-center justify-center">
        <img
          src={member.photo || getAvatarUrl(member.name)}
          alt={member.name}
          className="w-full h-full object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = getAvatarUrl(member.name);
          }}
        />
      </div>
      <h4 className="text-base font-semibold text-gray-800">{member.name}</h4>
      {member.affiliation && (
        <p className="text-xs text-gray-600 mt-1">{member.affiliation}</p>
      )}
    </div>
  );

  // Chair成员数据
  const chairMembers = [
    {
      name: 'Dr. Xiaoou Li',
      photo: '/committee/xiaoou.jpg',
      affiliation: 'Cinvestav, Mexico',
      role: 'General Chair'
    },
    {
      name: 'Wen Yu',
      photo: '/committee/Wenyu.png',
      affiliation: 'Cinvestav, Mexico',
      role: 'Program Chair'
    }
  ];

  // 其他组织委员会成员数据 - 重新分组为两个一行
  const otherGroups: CommitteeGroup[] = [
    {
      title: 'Local Arrangement',
      members: [
        {
          name: 'Katia Gabriela Ocampo Reyna',
          photo: '/committee/Katia.png'
        },
        {
          name: 'Jiménez Alcantar Daniel'
        }
      ]
    },
    {
      title: 'Technical Support',
      members: [
        {
          name: 'Yingqin Zhu',
          photo: '/committee/Yingqin.png'
        },
        {
          name: 'Ruiz Hernandez Christian'
        }
      ]
    },
    {
      title: 'Registration',
      members: [
        {
          name: 'Ernesto Anell Solis'
        },
        {
          name: 'Galarza Chavez Angel Alonso'
        }
      ]
    },
    {
      title: 'Publicity and Media',
      members: [
        {
          name: 'José Luis Flores Garcilazo',
          photo: '/committee/Luis.png'
        },
        {
          name: 'José Cruz Cedillo',
          photo: '/committee/Cruz.png'
        }
      ]
    }
  ];

  // 将其他组织者按两个一行进行分组
  const groupedOtherGroups = [];
  for (let i = 0; i < otherGroups.length; i += 2) {
    groupedOtherGroups.push(otherGroups.slice(i, i + 2));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Organizing Committee</h1>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated team behind the FEW-AI 2025 Workshop
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 统一的组织委员会成员展示 - 按角色分组 */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-12">
            {/* Chair成员 - 并排显示 */}
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Chairs</h3>
                <div className="w-full h-px bg-gray-200"></div>
              </div>
              
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* General Chair */}
                <div className="text-center">
                  <h4 className="text-base font-medium text-blue-600 mb-4">General Chair</h4>
                  <MemberCard member={chairMembers[0]} />
                </div>
                
                {/* 垂直分隔线 */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-px top-0 h-full w-px bg-gray-200"></div>
                
                {/* Program Chair */}
                <div className="text-center">
                  <h4 className="text-base font-medium text-blue-600 mb-4">Program Chair</h4>
                  <MemberCard member={chairMembers[1]} />
                </div>
              </div>
            </div>

            {/* 其他组织委员会成员 - 两个一行 */}
            {groupedOtherGroups.map((groupPair, pairIndex) => (
              <div key={pairIndex} className="space-y-8">
                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {groupPair.map((group, groupIndex) => (
                    <div key={groupIndex} className="space-y-6">
                      {/* 分组标题 */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">{group.title}</h3>
                        <div className="w-full h-px bg-gray-200"></div>
                      </div>
                      
                      {/* 分组成员 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {group.members.map((member, memberIndex) => (
                          <MemberCard key={memberIndex} member={member} />
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {/* 垂直分隔线 - 只在有两个组时显示 */}
                  {groupPair.length === 2 && (
                    <div className="hidden lg:block absolute left-1/2 transform -translate-x-px top-0 h-full w-px bg-gray-200"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organize;